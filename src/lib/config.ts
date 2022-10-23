import { writable, type Writable } from "svelte/store";
import { browser } from '$app/environment';

export const host = "https://main.nv7haven.com/";

export type Service = {
  id: string,
  name: string,
  running: boolean,
  building: boolean,
}

export let services: Writable<Service[]> = writable([]);
export let uid = writable("");

function connect() {
  let sock = new WebSocket("ws" + host.substring(4) + "services");
  sock.onmessage = (e) => {
    let data = JSON.parse(e.data);
    services.set(data);
  }
  sock.onclose = connect
}

if (browser) {
  connect();
}
