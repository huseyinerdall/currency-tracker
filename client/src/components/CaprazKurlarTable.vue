<template>
  <div>
    <table
      style="table-layout:fixed;"
      class="mt-1"
      :style="
        $store.state.isLight
          ? 'background-color:rgba(255,255,255,0.3);color:rgba(0,0,0,0.83) !important;'
          : 'background-color:rgba(0,0,0,0.3);color:rgba(255,255,255,0.83) !important;'
      "
    >
      <thead>
        <tr>
          <th
            :class="
              $store.state.isLight
                ? 'pinkk body-1'
                : 'amber--text accent-3 body-1'
            "
            style="width: 160px !important;"
          >
            Çapraz Kurlar
          </th>
          <th
            :class="
              $store.state.isLight
                ? 'pinkk body-1'
                : 'amber--text accent-3 body-1'
            "
          >
            Parite
          </th>
          <th
            :class="
              $store.state.isLight
                ? 'pinkk body-1'
                : 'amber--text accent-3 body-1'
            "
          >
            Fark
          </th>
          <th
            :class="
              $store.state.isLight
                ? 'pinkk body-1'
                : 'amber--text accent-3 body-1'
            "
          >
            Yüzde
          </th>
          <th
            :class="
              $store.state.isLight
                ? 'pinkk body-1'
                : 'amber--text accent-3 body-1'
            "
          >
            Saat
          </th>
        </tr>
      </thead>
      <tbody v-if="data[0]">
        <tr>
          <td>{{ symbols[0] }}</td>
          <td>
            {{
              (data[3]["today"].replace(",", ".").replace(",", ".") /
                data[0]["today"].replace(",", ".").replace(",", "."))
                | turkishCurrencyformat
            }}
          </td>
          <td
            :class="[
              data[3]['today'].replace(',', '.') /
                data[0]['today'].replace(',', '.') -
                data[3]['yesterday'].replace(',', '.') /
                  data[0]['yesterday'].replace(',', '.') >=
              0
                ? 'green--text'
                : 'red--text'
            ]"
            :key="symbols[0]"
          >
            {{
              (data[3]["today"].replace(",", ".") /
                data[0]["today"].replace(",", ".") -
                data[3]["yesterday"].replace(",", ".") /
                  data[0]["yesterday"].replace(",", "."))
                | signintt
            }}
          </td>
          <td
            :class="[
              data[3]['today'].replace(',', '.') /
                data[0]['today'].replace(',', '.') -
                data[3]['yesterday'].replace(',', '.') /
                  data[0]['yesterday'].replace(',', '.') >=
              0
                ? 'green--text'
                : 'red--text'
            ]"
          >
            {{
              (((data[3]["today"].replace(",", ".") /
                data[0]["today"].replace(",", ".") -
                data[3]["yesterday"].replace(",", ".") /
                  data[0]["yesterday"].replace(",", ".")) /
                data[0]["today"].replace(",", ".")) *
                100)
                | signintt
            }}%
          </td>
          <td>{{ data[0]["time"] | onlyTime }}</td>
        </tr>
        <tr>
          <td>{{ symbols[1] }}</td>
          <td>
            {{
              (data[0]["today"].replace(",", ".") /
                data[3]["today"].replace(",", "."))
                | turkishCurrencyformat
            }}
          </td>
          <td
            :class="[
              data[0]['today'].replace(',', '.') /
                data[3]['today'].replace(',', '.') -
                data[0]['yesterday'].replace(',', '.') /
                  data[3]['yesterday'].replace(',', '.') >=
              0
                ? 'green--text'
                : 'red--text'
            ]"
            :key="symbols[1]"
          >
            {{
              (data[0]["today"].replace(",", ".") /
                data[3]["today"].replace(",", ".") -
                data[0]["yesterday"].replace(",", ".") /
                  data[3]["yesterday"].replace(",", "."))
                | signintt
            }}
          </td>
          <td
            :class="[
              data[0]['today'].replace(',', '.') /
                data[3]['today'].replace(',', '.') -
                data[0]['yesterday'].replace(',', '.') /
                  data[3]['yesterday'].replace(',', '.') >=
              0
                ? 'green--text'
                : 'red--text'
            ]"
          >
            {{
              (((data[0]["today"].replace(",", ".") /
                data[3]["today"].replace(",", ".") -
                data[0]["yesterday"].replace(",", ".") /
                  data[3]["yesterday"].replace(",", ".")) /
                data[3]["today"].replace(",", ".")) *
                100)
                | signintt
            }}%
          </td>
          <td>{{ data[0]["time"] | onlyTime }}</td>
        </tr>
        <tr>
          <td>{{ symbols[2] }}</td>
          <td>
            {{
              (data[4]["today"].replace(",", ".") /
                data[0]["today"].replace(",", "."))
                | turkishCurrencyformat
            }}
          </td>
          <td
            :class="[
              data[4]['today'].replace(',', '.') /
                data[0]['today'].replace(',', '.') -
                data[4]['yesterday'].replace(',', '.') /
                  data[0]['yesterday'].replace(',', '.') >=
              0
                ? 'green--text'
                : 'red--text'
            ]"
            :key="symbols[2]"
          >
            {{
              (data[4]["today"].replace(",", ".") /
                data[0]["today"].replace(",", ".") -
                data[4]["yesterday"].replace(",", ".") /
                  data[0]["yesterday"].replace(",", "."))
                | signintt
            }}
          </td>
          <td
            :class="[
              data[4]['today'].replace(',', '.') /
                data[0]['today'].replace(',', '.') -
                data[4]['yesterday'].replace(',', '.') /
                  data[0]['yesterday'].replace(',', '.') >=
              0
                ? 'green--text'
                : 'red--text'
            ]"
          >
            {{
              (((data[4]["today"].replace(",", ".") /
                data[0]["today"].replace(",", ".") -
                data[4]["yesterday"].replace(",", ".") /
                  data[0]["yesterday"].replace(",", ".")) /
                data[0]["today"].replace(",", ".")) *
                100)
                | signintt
            }}%
          </td>
          <td>{{ data[0]["time"] | onlyTime }}</td>
        </tr>
        <tr>
          <td>{{ symbols[3] }}</td>
          <td>
            {{
              (data[0]["today"].replace(",", ".") /
                data[4]["today"].replace(",", "."))
                | turkishCurrencyformat
            }}
          </td>
          <td
            :class="[
              data[0]['today'].replace(',', '.') /
                data[4]['today'].replace(',', '.') -
                data[0]['yesterday'].replace(',', '.') /
                  data[4]['yesterday'].replace(',', '.') >=
              0
                ? 'green--text'
                : 'red--text'
            ]"
            :key="symbols[3]"
          >
            {{
              (data[0]["today"].replace(",", ".") /
                data[4]["today"].replace(",", ".") -
                data[0]["yesterday"].replace(",", ".") /
                  data[4]["yesterday"].replace(",", "."))
                | signintt
            }}
          </td>
          <td
            :class="[
              data[0]['today'].replace(',', '.') /
                data[4]['today'].replace(',', '.') -
                data[0]['yesterday'].replace(',', '.') /
                  data[4]['yesterday'].replace(',', '.') >=
              0
                ? 'green--text'
                : 'red--text'
            ]"
          >
            {{
              (((data[0]["today"].replace(",", ".") /
                data[4]["today"].replace(",", ".") -
                data[0]["yesterday"].replace(",", ".") /
                  data[4]["yesterday"].replace(",", ".")) /
                data[4]["today"].replace(",", ".")) *
                100)
                | signintt
            }}%
          </td>
          <td>{{ data[0]["time"] | onlyTime }}</td>
        </tr>
        <tr>
          <td>{{ symbols[4] }}</td>
          <td>
            {{
              (data[7]["today"].replace(",", ".") /
                data[0]["today"].replace(",", "."))
                | turkishCurrencyformat
            }}
          </td>
          <td
            :class="[
              data[7]['today'].replace(',', '.') /
                data[0]['today'].replace(',', '.') -
                data[7]['yesterday'].replace(',', '.') /
                  data[0]['yesterday'].replace(',', '.') >=
              0
                ? 'green--text'
                : 'red--text'
            ]"
            :key="symbols[4]"
          >
            {{
              (data[7]["today"].replace(",", ".") /
                data[0]["today"].replace(",", ".") -
                data[7]["yesterday"].replace(",", ".") /
                  data[0]["yesterday"].replace(",", "."))
                | signintt
            }}
          </td>
          <td
            :class="[
              data[3]['today'].replace(',', '.') /
                data[0]['today'].replace(',', '.') -
                data[3]['yesterday'].replace(',', '.') /
                  data[0]['yesterday'].replace(',', '.') >=
              0
                ? 'green--text'
                : 'red--text'
            ]"
          >
            {{
              (((data[7]["today"].replace(",", ".") /
                data[0]["today"].replace(",", ".") -
                data[7]["yesterday"].replace(",", ".") /
                  data[0]["yesterday"].replace(",", ".")) /
                data[0]["today"].replace(",", ".")) *
                100)
                | signintt
            }}%
          </td>
          <td>{{ data[0]["time"] | onlyTime }}</td>
        </tr>
        <tr>
          <td>{{ symbols[5] }}</td>
          <td>
            {{
              (data[0]["today"].replace(",", ".") /
                data[7]["today"].replace(",", "."))
                | turkishCurrencyformat
            }}
          </td>
          <td
            :class="[
              data[0]['today'].replace(',', '.') /
                data[7]['today'].replace(',', '.') -
                data[0]['yesterday'].replace(',', '.') /
                  data[7]['yesterday'].replace(',', '.') >=
              0
                ? 'green--text'
                : 'red--text'
            ]"
            :key="symbols[5]"
          >
            {{
              (data[0]["today"].replace(",", ".") /
                data[7]["today"].replace(",", ".") -
                data[0]["yesterday"].replace(",", ".") /
                  data[7]["yesterday"].replace(",", "."))
                | signintt
            }}
          </td>
          <td
            :class="[
              data[0]['today'].replace(',', '.') /
                data[3]['today'].replace(',', '.') -
                data[0]['yesterday'].replace(',', '.') /
                  data[3]['yesterday'].replace(',', '.') >=
              0
                ? 'green--text'
                : 'red--text'
            ]"
          >
            {{
              (((data[0]["today"].replace(",", ".") /
                data[7]["today"].replace(",", ".") -
                data[0]["yesterday"].replace(",", ".") /
                  data[7]["yesterday"].replace(",", ".")) /
                data[7]["today"].replace(",", ".")) *
                100)
                | signintt
            }}%
          </td>
          <td>{{ data[0]["time"] | onlyTime }}</td>
        </tr>
        <tr>
          <td>{{ symbols[6] }}</td>
          <td>
            {{
              (data[11]["today"].replace(",", ".") /
                data[0]["today"].replace(",", "."))
                | turkishCurrencyformat
            }}
          </td>
          <td
            :class="[
              data[7]['today'].replace(',', '.') /
                data[0]['today'].replace(',', '.') -
                data[7]['yesterday'].replace(',', '.') /
                  data[0]['yesterday'].replace(',', '.') >=
              0
                ? 'green--text'
                : 'red--text'
            ]"
            :key="symbols[6]"
          >
            {{
              (data[11]["today"].replace(",", ".") /
                data[0]["today"].replace(",", ".") -
                data[11]["yesterday"].replace(",", ".") /
                  data[0]["yesterday"].replace(",", "."))
                | signintt
            }}
          </td>
          <td
            :class="[
              data[11]['today'].replace(',', '.') /
                data[0]['today'].replace(',', '.') -
                data[11]['yesterday'].replace(',', '.') /
                  data[0]['yesterday'].replace(',', '.') >=
              0
                ? 'green--text'
                : 'red--text'
            ]"
          >
            {{
              (((data[11]["today"].replace(",", ".") /
                data[0]["today"].replace(",", ".") -
                data[11]["yesterday"].replace(",", ".") /
                  data[0]["yesterday"].replace(",", ".")) /
                data[0]["today"].replace(",", ".")) *
                100)
                | signintt
            }}%
          </td>
          <td>{{ data[0]["time"] | onlyTime }}</td>
        </tr>
        <tr>
          <td>{{ symbols[7] }}</td>
          <td>
            {{
              (data[0]["today"].replace(",", ".") /
                data[11]["today"].replace(",", "."))
                | turkishCurrencyformat
            }}
          </td>
          <td
            :class="[
              data[0]['today'].replace(',', '.') /
                data[7]['today'].replace(',', '.') -
                data[0]['yesterday'].replace(',', '.') /
                  data[7]['yesterday'].replace(',', '.') >=
              0
                ? 'green--text'
                : 'red--text'
            ]"
            :key="symbols[7]"
          >
            {{
              (data[0]["today"].replace(",", ".") /
                data[11]["today"].replace(",", ".") -
                data[0]["yesterday"].replace(",", ".") /
                  data[11]["yesterday"].replace(",", "."))
                | signintt
            }}
          </td>
          <td
            :class="[
              data[0]['today'].replace(',', '.') /
                data[3]['today'].replace(',', '.') -
                data[0]['yesterday'].replace(',', '.') /
                  data[3]['yesterday'].replace(',', '.') >=
              0
                ? 'green--text'
                : 'red--text'
            ]"
          >
            {{
              (((data[0]["today"].replace(",", ".") /
                data[11]["today"].replace(",", ".") -
                data[0]["yesterday"].replace(",", ".") /
                  data[11]["yesterday"].replace(",", ".")) /
                data[11]["today"].replace(",", ".")) *
                100)
                | signintt
            }}%
          </td>
          <td>{{ data[0]["time"] | onlyTime }}</td>
        </tr>

        <tr>
          <td>{{ symbols[8] }}</td>
          <td>
            {{
              (data[3]["today"].replace(",", ".") /
                data[4]["today"].replace(",", "."))
                | turkishCurrencyformat
            }}
          </td>
          <td
            :class="[
              data[3]['today'].replace(',', '.') /
                data[4]['today'].replace(',', '.') -
                data[3]['yesterday'].replace(',', '.') /
                  data[4]['yesterday'].replace(',', '.') >=
              0
                ? 'green--text'
                : 'red--text'
            ]"
            :key="symbols[8]"
          >
            {{
              (data[3]["today"].replace(",", ".") /
                data[4]["today"].replace(",", ".") -
                data[3]["yesterday"].replace(",", ".") /
                  data[4]["yesterday"].replace(",", "."))
                | signintt
            }}
          </td>
          <td
            :class="[
              data[0]['today'].replace(',', '.') /
                data[3]['today'].replace(',', '.') -
                data[0]['yesterday'].replace(',', '.') /
                  data[3]['yesterday'].replace(',', '.') >=
              0
                ? 'green--text'
                : 'red--text'
            ]"
          >
            {{
              (((data[3]["today"].replace(",", ".") /
                data[4]["today"].replace(",", ".") -
                data[3]["yesterday"].replace(",", ".") /
                  data[4]["yesterday"].replace(",", ".")) /
                data[4]["today"].replace(",", ".")) *
                100)
                | signintt
            }}%
          </td>
          <td>{{ data[0]["time"] | onlyTime }}</td>
        </tr>

        <tr>
          <td>{{ symbols[9] }}</td>
          <td>
            {{
              (data[4]["today"].replace(",", ".") /
                data[3]["today"].replace(",", "."))
                | turkishCurrencyformat
            }}
          </td>
          <td
            :class="[
              data[4]['today'].replace(',', '.') /
                data[3]['today'].replace(',', '.') -
                data[4]['yesterday'].replace(',', '.') /
                  data[3]['yesterday'].replace(',', '.') >=
              0
                ? 'green--text'
                : 'red--text'
            ]"
            :key="symbols[7]"
          >
            {{
              (data[4]["today"].replace(",", ".") /
                data[3]["today"].replace(",", ".") -
                data[4]["yesterday"].replace(",", ".") /
                  data[3]["yesterday"].replace(",", "."))
                | signintt
            }}
          </td>
          <td
            :class="[
              data[4]['today'].replace(',', '.') /
                data[3]['today'].replace(',', '.') -
                data[4]['yesterday'].replace(',', '.') /
                  data[3]['yesterday'].replace(',', '.') >=
              0
                ? 'green--text'
                : 'red--text'
            ]"
          >
            {{
              (((data[4]["today"].replace(",", ".") /
                data[3]["today"].replace(",", ".") -
                data[4]["yesterday"].replace(",", ".") /
                  data[3]["yesterday"].replace(",", ".")) /
                data[3]["today"].replace(",", ".")) *
                100)
                | signintt
            }}%
          </td>
          <td>{{ data[0]["time"] | onlyTime }}</td>
        </tr>
        <tr>
          <td>{{ symbols[10] }}</td>
          <td>
            {{
              (data[7]["today"].replace(",", ".") /
                data[3]["today"].replace(",", "."))
                | turkishCurrencyformat
            }}
          </td>
          <td
            :class="[
              data[7]['today'].replace(',', '.') /
                data[3]['today'].replace(',', '.') -
                data[7]['yesterday'].replace(',', '.') /
                  data[3]['yesterday'].replace(',', '.') >=
              0
                ? 'green--text'
                : 'red--text'
            ]"
            :key="symbols[7]"
          >
            {{
              (data[7]["today"].replace(",", ".") /
                data[3]["today"].replace(",", ".") -
                data[7]["yesterday"].replace(",", ".") /
                  data[3]["yesterday"].replace(",", "."))
                | signintt
            }}
          </td>
          <td
            :class="[
              data[7]['today'].replace(',', '.') /
                data[3]['today'].replace(',', '.') -
                data[7]['yesterday'].replace(',', '.') /
                  data[3]['yesterday'].replace(',', '.') >=
              0
                ? 'green--text'
                : 'red--text'
            ]"
          >
            {{
              (((data[7]["today"].replace(",", ".") /
                data[3]["today"].replace(",", ".") -
                data[7]["yesterday"].replace(",", ".") /
                  data[3]["yesterday"].replace(",", ".")) /
                data[3]["today"].replace(",", ".")) *
                100)
                | signintt
            }}%
          </td>
          <td>{{ data[0]["time"] | onlyTime }}</td>
        </tr>
        <tr>
          <td>{{ symbols[11] }}</td>
          <td>
            {{
              (data[3]["today"].replace(",", ".") /
                data[7]["today"].replace(",", "."))
                | turkishCurrencyformat
            }}
          </td>
          <td
            :class="[
              data[3]['today'].replace(',', '.') /
                data[7]['today'].replace(',', '.') -
                data[3]['yesterday'].replace(',', '.') /
                  data[7]['yesterday'].replace(',', '.') >=
              0
                ? 'green--text'
                : 'red--text'
            ]"
            :key="symbols[8]"
          >
            {{
              (data[3]["today"].replace(",", ".") /
                data[7]["today"].replace(",", ".") -
                data[3]["yesterday"].replace(",", ".") /
                  data[7]["yesterday"].replace(",", "."))
                | signintt
            }}
          </td>
          <td
            :class="[
              data[0]['today'].replace(',', '.') /
                data[3]['today'].replace(',', '.') -
                data[0]['yesterday'].replace(',', '.') /
                  data[3]['yesterday'].replace(',', '.') >=
              0
                ? 'green--text'
                : 'red--text'
            ]"
          >
            {{
              (((data[3]["today"].replace(",", ".") /
                data[7]["today"].replace(",", ".") -
                data[3]["yesterday"].replace(",", ".") /
                  data[7]["yesterday"].replace(",", ".")) /
                data[7]["today"].replace(",", ".")) *
                100)
                | signintt
            }}%
          </td>
          <td>{{ data[0]["time"] | onlyTime }}</td>
        </tr>
        <tr>
          <td>{{ symbols[12] }}</td>
          <td>
            {{
              (data[11]["today"].replace(",", ".") /
                data[3]["today"].replace(",", "."))
                | turkishCurrencyformat
            }}
          </td>
          <td
            :class="[
              data[11]['today'].replace(',', '.') /
                data[3]['today'].replace(',', '.') -
                data[11]['yesterday'].replace(',', '.') /
                  data[3]['yesterday'].replace(',', '.') >=
              0
                ? 'green--text'
                : 'red--text'
            ]"
            :key="symbols[12]"
          >
            {{
              (data[11]["today"].replace(",", ".") /
                data[3]["today"].replace(",", ".") -
                data[11]["yesterday"].replace(",", ".") /
                  data[3]["yesterday"].replace(",", "."))
                | signintt
            }}
          </td>
          <td
            :class="[
              data[11]['today'].replace(',', '.') /
                data[3]['today'].replace(',', '.') -
                data[11]['yesterday'].replace(',', '.') /
                  data[3]['yesterday'].replace(',', '.') >=
              0
                ? 'green--text'
                : 'red--text'
            ]"
          >
            {{
              (((data[11]["today"].replace(",", ".") /
                data[3]["today"].replace(",", ".") -
                data[11]["yesterday"].replace(",", ".") /
                  data[3]["yesterday"].replace(",", ".")) /
                data[3]["today"].replace(",", ".")) *
                100)
                | signintt
            }}%
          </td>
          <td>{{ data[0]["time"] | onlyTime }}</td>
        </tr>
        <tr>
          <td>{{ symbols[13] }}</td>
          <td>
            {{
              (data[3]["today"].replace(",", ".") /
                data[11]["today"].replace(",", "."))
                | turkishCurrencyformat
            }}
          </td>
          <td
            :class="[
              data[3]['today'].replace(',', '.') /
                data[11]['today'].replace(',', '.') -
                data[3]['yesterday'].replace(',', '.') /
                  data[11]['yesterday'].replace(',', '.') >=
              0
                ? 'green--text'
                : 'red--text'
            ]"
            :key="symbols[13]"
          >
            {{
              (data[3]["today"].replace(",", ".") /
                data[11]["today"].replace(",", ".") -
                data[3]["yesterday"].replace(",", ".") /
                  data[11]["yesterday"].replace(",", "."))
                | signintt
            }}
          </td>
          <td
            :class="[
              data[3]['today'].replace(',', '.') /
                data[11]['today'].replace(',', '.') -
                data[3]['yesterday'].replace(',', '.') /
                  data[11]['yesterday'].replace(',', '.') >=
              0
                ? 'green--text'
                : 'red--text'
            ]"
          >
            {{
              (((data[3]["today"].replace(",", ".") /
                data[11]["today"].replace(",", ".") -
                data[3]["yesterday"].replace(",", ".") /
                  data[11]["yesterday"].replace(",", ".")) /
                data[11]["today"].replace(",", ".")) *
                100)
                | signintt
            }}%
          </td>
          <td>{{ data[0]["time"] | onlyTime }}</td>
        </tr>
        <tr>
          <td>{{ symbols[14] }}</td>
          <td>
            {{
              (data[16]["today"].replace(",", ".") /
                data[3]["today"].replace(",", "."))
                | turkishCurrencyformat
            }}
          </td>
          <td
            :class="[
              data[11]['today'].replace(',', '.') /
                data[3]['today'].replace(',', '.') -
                data[11]['yesterday'].replace(',', '.') /
                  data[3]['yesterday'].replace(',', '.') >=
              0
                ? 'green--text'
                : 'red--text'
            ]"
            :key="symbols[14]"
          >
            {{
              (data[16]["today"].replace(",", ".") /
                data[3]["today"].replace(",", ".") -
                data[16]["yesterday"].replace(",", ".") /
                  data[3]["yesterday"].replace(",", "."))
                | signintt
            }}
          </td>
          <td
            :class="[
              data[16]['today'].replace(',', '.') /
                data[3]['today'].replace(',', '.') -
                data[16]['yesterday'].replace(',', '.') /
                  data[3]['yesterday'].replace(',', '.') >=
              0
                ? 'green--text'
                : 'red--text'
            ]"
          >
            {{
              (((data[16]["today"].replace(",", ".") /
                data[3]["today"].replace(",", ".") -
                data[16]["yesterday"].replace(",", ".") /
                  data[3]["yesterday"].replace(",", ".")) /
                data[3]["today"].replace(",", ".")) *
                100)
                | signintt
            }}%
          </td>
          <td>{{ data[0]["time"] | onlyTime }}</td>
        </tr>
        <tr>
          <td>{{ symbols[15] }}</td>
          <td>
            {{
              (data[3]["today"].replace(",", ".") /
                data[16]["today"].replace(",", "."))
                | turkishCurrencyformat
            }}
          </td>
          <td
            :class="[
              data[3]['today'].replace(',', '.') /
                data[11]['today'].replace(',', '.') -
                data[3]['yesterday'].replace(',', '.') /
                  data[11]['yesterday'].replace(',', '.') >=
              0
                ? 'green--text'
                : 'red--text'
            ]"
            :key="symbols[15]"
          >
            {{
              (data[3]["today"].replace(",", ".") /
                data[16]["today"].replace(",", ".") -
                data[3]["yesterday"].replace(",", ".") /
                  data[16]["yesterday"].replace(",", "."))
                | signintt
            }}
          </td>
          <td
            :class="[
              data[3]['today'].replace(',', '.') /
                data[16]['today'].replace(',', '.') -
                data[3]['yesterday'].replace(',', '.') /
                  data[16]['yesterday'].replace(',', '.') >=
              0
                ? 'green--text'
                : 'red--text'
            ]"
          >
            {{
              (((data[3]["today"].replace(",", ".") /
                data[16]["today"].replace(",", ".") -
                data[3]["yesterday"].replace(",", ".") /
                  data[16]["yesterday"].replace(",", ".")) /
                data[16]["today"].replace(",", ".")) *
                100)
                | signintt
            }}%
          </td>
          <td>{{ data[0]["time"] | onlyTime }}</td>
        </tr>
      </tbody>
      <tbody v-else style="height: 513px;position: relative;">
        <div style="position: absolute;top:50%;left:50%;margin-top: -62px;margin-left: -97px;">
          <Loading />
          <span style="color: #fff;text-align: center">Güncel Datalar Yükleniyor...</span>
        </div>
      </tbody>
    </table>
  </div>
</template>

<script>
//import axios from "axios";
import currencies from "../assets/currencies.js";
//import io from "socket.io-client";
import axios from "axios";
import Loading from "@/components/Loading";

export default {
  data() {
    return {
      goldloaded: true,
      currencies: currencies,
      symbols: [
        "EUR/USD",
        "USD/EUR",
        "GBP/USD",
        "USD/GBP",
        "CAD/USD",
        "USD/CAD",
        "JPY/USD",
        "USD/JPY",
        "EUR/GBP",
        "GBP/EUR",
        "CAD/EUR",
        "EUR/CAD",
        "JPY/EUR",
        "EUR/JPY",
        "CNY/EUR",
        "EUR/CNY"
      ],
      data: []
    };
  },
  created() {
    //let app = this;
    axios.get(`${this.$store.state.api}/pariteler`).then(response => {
      console.log(response.data);
      this.data = response.data;
    });
  },
  methods: {},
  components: {
    Loading
  }
};
</script>

<style scoped>
table {
  width: 100% !important;
  border: 1px solid #ddd;
  border-collapse: collapse;
}

tr {
  text-align: start;
  padding-left: 8px;
  border-bottom: 1pt solid #ddd;
  font-size: 13px !important;
  height: 32px;
}

td {
  padding: 2px;
  padding-left: 10px;
  font-weight: 400;
  letter-spacing: 0.03125em !important;
  line-height: 1.5rem;
  font-family: "Roboto", sans-serif !important;
}

th {
  padding: 4px;
  text-align: start;
  padding-left: 10px;
}
@media screen and (max-width: 768px) {
  table tr td:nth-child(3),
  table tr th:nth-child(3),
  table tr td:nth-child(4),
  table tr th:nth-child(4) {
    display: none;
  }
}
tr:hover {
  background-color: rgba(0, 0, 0, 0.3);
}
.pinkk {
  color: #ff3366 !important;
}
</style>
