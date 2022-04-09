import { Client } from "photop-client";
import { onChat } from "./commands_entry.js";
import { START, PREFIX } from "./constants.js";

const client = new Client({ username: "", password: "" }, { logSocketMessages: false });

const noop = () => { };

client.onPost = async (post) => {
  const resetTimeout = await post.connect(60000, () => {
    post.onChat = noop; //replace post.onChat to free up memory
    if (post.text.match(START)) {
      post.chat("Bot has disconnected... Reason: inactivity")
    }
  })
  if (post.text.match(START)) {
    setTimeout(function( ) {
      resetTimeout()
      post.chat(`Say ${PREFIX}help to get a list of commands.`)
    }, 2000)
  }

  post.onChat = (chat) => {
    resetTimeout();
    onChat(client, chat);
  }
  }

client.onReady = () => {
  console.log("Bot is ready!")
}
