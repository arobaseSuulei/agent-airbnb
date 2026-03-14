import { useState, useEffect, useRef } from "react";
import axios from "axios";

const AI_LOGO = "https://brandlogos.net/wp-content/uploads/2025/02/apple_intelligence-logo_brandlogos.net_zmypw-512x504.png";
const LARAVEL_URL = "http://localhost:8001/api/chat";

export default function Chat() {
    const [messages, setMessages] = useState([
        {
            role: "ai",
            content: "Bonjour ! 👋 Je suis votre assistant de réservation. Dites-moi où vous souhaitez séjourner et je trouve les meilleurs logements pour vous !",
        },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef(null);

    // Auto-scroll vers le bas à chaque nouveau message
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    async function sendMessage() {
        if (input.trim() === "" || loading) return;

        const userMessage = { role: "user", content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        // POST vers l api
        try {
            const response = await axios.post(LARAVEL_URL, { // c est sychrone on recoit egalement la reponse de laravel
                message: input,
            });

            const aiMessage = {
                role: "ai",
                content: response.data.reponse,
            };
            setMessages((prev) => [...prev, aiMessage]);
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                { role: "ai", content: "Une erreur est survenue, veuillez réessayer." },
            ]);
        } finally {
            setLoading(false);
        }
    }

    // Envoyer avec la touche Entrée
    function handleKeyDown(e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    }

    return (
        <div className="  flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-white  flex flex-col h-[80vh]">



                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex flex-col ${
                                message.role === "user" ? "items-end" : "items-start"
                            }`}
                        >
                            {/* Avatar IA */}
                            {message.role === "ai" && (
                                <div className="flex items-center gap-2 mb-1">
                                    <img src={AI_LOGO} className="w-5 h-5 rounded-full" alt="AI" />
                                    <span className="text-xs text-gray-400"></span>
                                </div>
                            )}

                            {/* Bulle message */}
                            <div
                                style={{ maxWidth: "80%" }}
                                className={`p-3 rounded-2xl text-sm whitespace-pre-wrap ${
                                    message.role === "user"
                                        ? "bg-blue-500 text-white text-xs rounded-tr-none"
                                        : "bg-blue-500 text-white text-xs rounded-tl-none"
                                }`}
                            >
                                {message.content}
                            </div>
                        </div>
                    ))}



                    <div ref={bottomRef} />
                </div>

                {/* Input */}
                <div className="border-t p-4 flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ex: Je cherche un logement à Paris pour 2 personnes..."
                        className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-blue-400"
                    />
                    <button
                        onClick={sendMessage}
                        disabled={loading || input.trim() === ""}
                        className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white rounded-xl px-4 py-2 text-sm transition"
                    >
                        Envoyer
                    </button>
                </div>

            </div>
        </div>
    );
}