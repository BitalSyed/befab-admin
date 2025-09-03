"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { API_URL, getCookie } from "@/components/cookieUtils";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

export default function ChatDashboard({ userId }) {
  // --- state ---
  const [allUsers, setAllUsers] = useState([]); // full directory
  const [search, setSearch] = useState("");
  const [activeChat, setActiveChat] = useState(null); // populated chat doc
  const [selectedUser, setSelectedUser] = useState(null); // who we clicked in the list
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loadingChat, setLoadingChat] = useState(false);

  // socket singleton
  const socketRef = useRef(null);
  const msgsEndRef = useRef(null);

  // --- init socket once ---
  useEffect(() => {
    socketRef.current = io(API_URL, { transports: ["websocket"] });
    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, []);

  // --- fetch ALL users for the left panel (don’t gate on userId) ---
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `${API_URL}/admin/users?token=${getCookie("skillrextech_auth")}`
        );
        const data = await res.json();
        if (Array.isArray(data)) {
          setAllUsers(data);
        } else {
          toast.error(data?.error || "Failed to load users");
        }
      } catch (e) {
        console.error(e);
        toast.error("Failed to load users");
      }
    })();
  }, []);

  // --- whenever activeChat changes: join room + load messages + live updates ---
  useEffect(() => {
    if (!activeChat?._id || !socketRef.current) return;

    // join room
    socketRef.current.emit("joinChat", activeChat._id);

    // load history
    (async () => {
      try {
        const res = await fetch(
          `${API_URL}/admin/chats/${activeChat._id}/messages?token=${getCookie(
            "skillrextech_auth"
          )}`
        );
        const msgs = await res.json();
        setMessages(Array.isArray(msgs) ? msgs : []);
      } catch (e) {
        console.error(e);
        toast.error("Failed to load messages");
      }
    })();

    // subscribe
    const onNewMessage = (msg) => {
      if (msg?.chatId === activeChat._id) {
        setMessages((prev) => [...prev, msg]);
      }
    };
    socketRef.current.on("newMessage", onNewMessage);

    return () => {
      socketRef.current?.off("newMessage", onNewMessage);
    };
  }, [activeChat]);

  // --- auto scroll to bottom on new messages ---
  useEffect(() => {
    msgsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // --- helpers ---
  const stringId = (v) =>
    typeof v === "object" && v?._id ? String(v._id) : String(v);
  const amISender = (msg) => {
    // console.log(msg)
    if (!msg?.sender) return false;
    const senderId =
      typeof msg.sender === "object" && msg.sender._id
        ? String(msg.sender._id)
        : String(msg.sender);
        // console.log(senderId)
    return senderId === String(userId);
  };

  const filteredUsers = useMemo(() => {
    const q = search.trim().toLowerCase();
    return (
      allUsers
        .filter((u) => String(u._id) !== String(userId)) // hide self
        .filter((u) => {
          if (!q) return true;
          const fields = [
            u.firstName || "",
            u.lastName || "",
            u.username || "",
            u.name || "",
            u.email || "",
            u.phone || "",
          ]
            .join(" ")
            .toLowerCase();
          return fields.includes(q);
        })
        // stable, readable ordering
        .sort((a, b) =>
          `${a.firstName || ""} ${a.lastName || ""}`.localeCompare(
            `${b.firstName || ""} ${b.lastName || ""}`
          )
        )
    );
  }, [allUsers, search, userId]);

  const ensurePopulatedChat = async (chatId) => {
    // fetch the user's chats (populated) and pick this one
    const chats = await fetch(
      `${API_URL}/admin/chats?token=${getCookie("skillrextech_auth")}`
    ).then((r) => r.json());
    return (
      (Array.isArray(chats) ? chats : []).find((c) => c._id === chatId) || null
    );
  };

  const openChatWithUser = async (otherUser) => {
    setSelectedUser(otherUser);
    setLoadingChat(true);
    try {
      // 1) find existing user chats
      const chats = await fetch(
        `${API_URL}/admin/chats?token=${getCookie("skillrextech_auth")}`
      ).then((r) => r.json());

      // 2) look for chat containing the selected user
      let chat =
        (Array.isArray(chats) ? chats : []).find((c) =>
          (c.participants || []).some(
            (p) => String(p._id) === String(otherUser._id)
          )
        ) || null;

      // 3) if not found, create one
      if (!chat) {
        const created = await fetch(
          `${API_URL}/admin/chats?token=${getCookie("skillrextech_auth")}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ participantIds: [otherUser._id] }),
          }
        ).then((r) => r.json());

        // fetch populated version so right sidebar has full user objects
        chat = await ensurePopulatedChat(created?._id);
      }

      if (!chat) {
        toast.error("Unable to open chat");
        return;
      }

      setActiveChat(chat);
    } catch (e) {
      console.error(e);
      toast.error("Failed to open chat");
    } finally {
      setLoadingChat(false);
    }
  };

  const handleSend = () => {
    const content = input.trim();
    if (!content || !activeChat?._id || !socketRef.current) return;

    socketRef.current.emit("sendMessage", {
      chatId: activeChat._id,
      senderId: userId,
      content,
    });
    setInput("");
  };

  // --- UI ---
  const rightPaneUser =
    activeChat?.participants?.find((p) => String(p._id) !== String(userId)) ||
    selectedUser ||
    null;

  return (
    <div className="grid grid-cols-12 mt-5 mx-6">
      {/* LEFT: All Users + Search */}
      <aside className="col-span-3 border-r bg-white flex flex-col mr-5 rounded-lg max-h-[80vh] oveflow-y-auto">
        <div className="p-4 font-semibold">Users</div>
        <div className="px-4 pb-2">
          <Input
            placeholder="Search users by name, username, email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <ScrollArea className="flex-1">
          <div className="space-y-1">
            {filteredUsers.map((u) => (
              <div
                key={u._id}
                className={`px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2 ${
                  activeChat?.participants?.some(
                    (p) => String(p._id) === String(u._id)
                  )
                    ? "bg-gray-200"
                    : ""
                }`}
                onClick={() => openChatWithUser(u)}
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {(u.firstName?.[0] || u.username?.[0] || "?").toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col truncate">
                  <span className="text-sm truncate">
                    {u.firstName || u.name || u.username} {u.lastName || ""}
                  </span>
                  <span className="text-xs text-gray-500 truncate">
                    {u.username || u.email || ""}
                  </span>
                </div>
              </div>
            ))}
            {filteredUsers.length === 0 && (
              <div className="px-4 py-8 text-sm text-gray-500">
                No users found.
              </div>
            )}
          </div>
        </ScrollArea>
      </aside>

      {/* MIDDLE: Chat */}
      <main className="col-span-6 flex flex-col">
        <Card className="flex-1 flex flex-col">
          <CardHeader>
            <CardTitle>
              {rightPaneUser
                ? `${
                    rightPaneUser.firstName ||
                    rightPaneUser.name ||
                    rightPaneUser.username ||
                    "Chat"
                  }`
                : "Select a user to start chatting"}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col">
            <ScrollArea className="flex-1 space-y-2 pr-2 max-h-[100%]">
              {messages.map((msg) => (
                <div
                  key={msg._id || msg.tempId}
                  className={`flex ${
                    amISender(msg) ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-lg text-sm my-1 ${
                      amISender(msg)
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              <div ref={msgsEndRef} />
            </ScrollArea>

            {activeChat && (
              <div className="flex gap-2 mt-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message…"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSend();
                  }}
                  disabled={loadingChat}
                />
                <Button
                  onClick={handleSend}
                  disabled={loadingChat || !input.trim()}
                >
                  Send
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* RIGHT: User / Chat details (always rendered) */}
      <aside className="col-span-3 border-l bg-white p-4 space-y-4 ml-5 rounded-lg">
        <Card>
          <CardHeader>
            <CardTitle>User Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {rightPaneUser ? (
              <>
                <div className="font-semibold">
                  {(rightPaneUser.firstName ||
                    rightPaneUser.name ||
                    rightPaneUser.username) +
                    (rightPaneUser.lastName
                      ? ` ${rightPaneUser.lastName}`
                      : "")}
                </div>
                {rightPaneUser.username && (
                  <p className="text-sm text-gray-500">
                    @{rightPaneUser.username}
                  </p>
                )}
                {rightPaneUser.email && (
                  <p className="text-sm text-gray-500">{rightPaneUser.email}</p>
                )}
                <Button
                  size="sm"
                  className="mr-2"
                  onClick={() =>
                    rightPaneUser && openChatWithUser(rightPaneUser)
                  }
                  disabled={loadingChat}
                >
                  {activeChat ? "Open Chat" : "Start Chat"}
                </Button>
              </>
            ) : (
              <p className="text-sm text-gray-500">
                Select a user to view details.
              </p>
            )}
          </CardContent>
        </Card>

        {/* <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea placeholder="Add notes about this member..." />
            <Button className="mt-2 w-full">Save Notes</Button>
          </CardContent>
        </Card> */}
      </aside>
    </div>
  );
}
