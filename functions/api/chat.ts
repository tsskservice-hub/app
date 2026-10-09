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
    
    // Cloudflareの環境変数から設定値を取得
    const projectId = env?.VERTEX_AI_PROJECT_ID;
    const region = env?.VERTEX_AI_REGION || "us-central1";
    const serviceAccountJson = env?.GOOGLE_SERVICE_ACCOUNT_JSON;

    // 環境変数が未設定の場合は明確なエラーメッセージを返す
    if (!projectId || !serviceAccountJson) {
      return new Response(
        JSON.stringify({ 
          reply: "Server configuration error: Vertex AI Project ID or Service Account JSON is missing in Cloudflare environment variables." 
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // 💡 VCE日本語教師としてのシステムプロンプト・ペルソナの定義
    const systemPrompt = `You are Japanese Tutor AI Yamato, an expert VCE Japanese high school educator in Victoria, Australia. 
Your student's learning pace is set to "${learningPace}". 
Provide encouraging, clear, and pedagogically sound guidance aligned with VCE Japanese standards.`;

    // ─── ここに実際の Google Vertex AI (Gemini) API 呼び出し処理を将来的に記述します ───
    // 現時点では、環境変数の読み込みテストとして受け答えを返すようにしています
    
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