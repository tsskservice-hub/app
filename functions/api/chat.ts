export async function onRequestPost(context: any) {
  try {
    const { request, env } = context;
    const body = await request.json() as {
      message: string;
      chatHistory?: Array<{ role: string; content: string }>;
      learningPace?: string;
      visualPrompt?: string;
    };

    const { message, chatHistory = [], learningPace = "steady", visualPrompt } = body;
    const apiKey = env?.VERTEX_AI_API_KEY || env?.OPENAI_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({ reply: "API key is not configured on the server environment variables." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // 💡 VCE日本語教師としてのシステムプロンプト・ペルソナの定義
    const systemPrompt = `You are Japanese Tutor AI Yamato, an expert VCE Japanese high school educator in Victoria, Australia. 
Your student's learning pace is set to "${learningPace}". 
Provide encouraging, clear, and pedagogically sound guidance aligned with VCE Japanese standards.`;

    let replyText = `[AI Yamato (${learningPace} pace)]: ご質問ありがとうございます！「${message}」についてですね。VCEの試験に向けて素晴らしい着眼点です。`;
    
    if (learningPace === "accelerated") {
      replyText += " より高度な表現や文法規則についても確認していきましょう。";
    } else {
      replyText += " 一つずつ丁寧に確認していきましょうね。";
    }

    // 🎨 図解生成の要望がある場合
    let imageUrl: string | undefined = undefined;
    if (visualPrompt) {
      imageUrl = "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80";
    }

    return new Response(
      JSON.stringify({
        reply: replyText,
        imageUrl: imageUrl,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );

  } catch (err: any) {
    return new Response(
      JSON.stringify({ 
        reply: "Sorry, I encountered an error while processing your request with AI Yamato.", 
        error: err.message 
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}