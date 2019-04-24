var json_urls = [
  "http://n0.monet.network:8080",
  "http://n1.monet.network:8080",
  "http://n2.monet.network:8080",
  "http://n3.monet.network:8080"
];

function write_block_number(displayed_block_number) {
  var block_count = document.getElementById("block_count");
  block_count.innerHTML =
    '<i class="fas fa-cubes"></i> Block ' + displayed_block_number;
  console.log(last_block_index);
}

function get_last_block_index() {
  json_url = json_urls[0];
  xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      //good response
      var data = JSON.parse(this.responseText);
      console.log(data);
      last_block_index = data.last_block_index;
      retrieve_block_data(last_block_index);
    }
  };

  xmlhttp.open("GET", json_url + "/info", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send();
}

function get_block_data() {
  document.addEventListener("DOMContentLoaded", event => {
    get_last_block_index();
  });
}

function retrieve_block_data(block_number) {
  json_url = json_urls[0];
  xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      //good response
      var data = JSON.parse(this.responseText);
      console.log(data);
      append_block(data);
    }
  };

  xmlhttp.open("GET", json_url + "/block/" + block_number, true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send();
}

function get_network_data() {
  json_urls.forEach(function(json_url) {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        //good response
        var data = JSON.parse(this.responseText);
        console.log(data);
        last_block_index = data.last_block_index;
        append_json(data);
      }
    };

    xmlhttp.open("GET", json_url + "/info", true);
    xmlhttp.setRequestHeader(
      "Content-type",
      "application/x-www-form-urlencoded"
    );
    xmlhttp.send();
  });
}

function append_json(data) {
  var table = document.getElementById("t1");
  object = data;
  var tr = document.createElement("tr");
  tr.innerHTML =
    "<td>" +
    object.id +
    "</td>" +
    "<td>" +
    object.moniker +
    "</td>" +
    "<td>" +
    object.consensus_events +
    "</td>" +
    "<td>" +
    object.consensus_transactions +
    "</td>" +
    "<td>" +
    object.events_per_second +
    "</td>";
  table.appendChild(tr);
}

function append_block(data) {
  displayed_block_number = data.Body.Index;
  write_block_number(displayed_block_number);
  var table = document.getElementById("block-table");

  /*
  Body
:
FrameHash
:
"QUYpoooM6zO9VCuK6SeDhbsp3mTd8AL3vbWGvfSIe1Q="
Index
:
1
InternalTransactions
:
null
PeersHash
:
"HuZ6TG2arA9fmpaV6kmgQ+R0kqSG5INkIwea+Seh5aI="
RoundReceived
:
5
StateHash
:
"sScZ8cGULqw75JnTdD2kxivtCq9mOfxJc7gIdtO+4AE="
Transactions
:
Array(1)
0
:
"+GOAgIMBhqCU5RoMunQPd+dGcGnwd3Td3mPnoMqDCimQgCagLgKu/HFUc/3EDOT5/bRf0cvN1Nzm5pQbHzMEbU8L+hygYoenf0WgFMnJa9A3/08RTBpUcAl8SwhOxgeoM5Vhpsk="
length
:
1
__proto__
:
Array(0)
__proto__
:
Object
Signatures
:
{0x044E67940E20F0721229B86107BC6D4F64B60ED5E9A97B3B60B85BEE2F8AD819B8DEBEEEAD4A410F42E27975741BC76AAC9850CC9ADA50DCBD489AEB6C7C72312B: "2jgcc6wpujpl1591vcvk
*/

  object = data;
  table.innerHTML =
    "<tr><td>Index</td>" + "<td>" + object.Body.Index + "</td></tr>";

  var tr = document.createElement("tr");
  tr.innerHTML =
    "<td>Peers hash</td>" + "<td>" + object.Body.PeersHash + "</td>";
  table.appendChild(tr);

  /*

    "<td>" +
    object.Body.PeersHash +
    "</td>" +
    "<td>" +
    object.Body.StateHash +
    "</td>" +
    "<td>" +
    object.Body.StateHash +
    "</td>";
  */
}

function get_next_block() {
  block_index = displayed_block_number + 1;
  retrieve_block_data(block_index);
}

function get_previous_block() {
  block_index = displayed_block_number - 1;
  retrieve_block_data(block_index);
}

function get_account_button() {
  var address = document.getElementById("address-input").value;
  if (address) {
    get_account(address);
  }
}

function get_account(address) {
  //address = "0x629007Eb99ff5C3539ADA8A5800847eacfc25727";
  console.log(address);
  json_url = json_urls[0];
  xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      //good response
      var data = JSON.parse(this.responseText);
      console.log(data);
      display_account(data);
    }
  };

  xmlhttp.open("GET", json_url + "/account/" + address, true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send();
}

function display_account(data) {
  var table = document.getElementById("account-table");

  object = data;
  //var tr = document.createElement("tr");
  //tr.innerHTML = "<td>Balance</td>" + "<td>" + object.balance + "</td>";
  table.innerHTML =
    "<tr><td>Balance</td>" + "<td>" + object.balance + "</td></tr>";

  var tr = document.createElement("tr");
  tr.innerHTML = "<td>Nonce</td>" + "<td>" + object.nonce + "</td>";
  table.appendChild(tr);
}
