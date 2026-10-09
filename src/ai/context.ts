/**
 * @file context.ts
 * @description AIYAMATO の教育者としてのコンテキスト構築および動的インストラクション（App単体・実データ完全連携版）
 */

import { AIYAMATO_SYSTEM_PROMPT } from './system-prompt';

// src/data/ フォルダ内の実データファイルをインポート
import { vceGrammarCategories } from '../data/vce-grammar-list';
import vceVocabularyList from '../data/vce-vocabulary-list.json';
import writingExamQuestions from '../data/writing-exam-questions.json';
import oralExamQuestionsRaw from '../data/oral-exam-questions.json';

export interface PersonaContextOptions {
  /** 適用するトーン */
  tone?: string;
  /** 学習者のレベル */
  learnerLevel?: string;
  /** ユーザーのメールアドレス */
  userEmail?: string;
  /** ユーザーのニックネーム */
  userNickname?: string;
  /** 選択中の問題・タスク情報 */
  assignedQuestion?: string;
  /** 問題ID（数値） */
  questionId?: number;
  /** 文字数 */
  exactCharacterCount?: number;
  /** 学習ペース（'steady', 'normal', 'accelerated'） */
  learningPace?: 'steady' | 'normal' | 'accelerated' | string;
  /** リピーター判定 ("true" / "false") */
  isReturningUser?: string;
  /** 画像やファイルが添付されているか */
  hasFiles?: boolean;
  /** 会話のターン数 */
  dialogueCount?: number;
  /** カスタムの追加カリキュラムコンテキスト */
  curriculumContext?: string;
  /** 💡 質問ソースモード ('curriculum' | 'custom' | 'free') */
  questionSource?: string;
  /** 💡 アプリの種類（'writing' | 'oral' | 'general'） */
  appType?: 'writing' | 'oral' | 'general';
}

/**
 * 学習ペースに応じた詳細なインストラクションおよび出力テンプレートを生成するヘルパー（ライティング特化）
 */
function getPaceInstruction(pace?: string, exactCharacterCount: number = 0): string {
  if (!pace) return "";

  const lowerPace = pace.toLowerCase();

  if (lowerPace.includes("accelerated")) {
    return `
<pace_module_accelerated>
- Profile & Tone: High achiever. Academic, rigorous, challenging, no fluff.
- Volume & Style: High-density 4-layer analysis report. (All explanations and feedback must be written in English).
- Required Output Structure (Must start with badge from grading criteria):
  🏆 [VCE-Aligned Estimation Band] (Rigorous assessment, Rank 1-5)
  📊 [Character Count Check] (Check characters: ${exactCharacterCount} / 500, assess density)
  🔍 1. Advanced Grammar & Lexical Upgrades (Provide highly sophisticated synonyms and advanced grammar to achieve full marks. Explain nuances in English.)
  🧩 2. Discourse & Cohesion Analysis (Analyse paragraphing, logical flow, and transition words in English.)
  ✍ 3. Academic/Formal Register Refinement (Elevate casual style or colloquial speech to formal academic prose and written-style vocabulary.)
  👑 4. VCE Examiner Perspective (Advise on grammar variety strategy, micro traps such as intransitive/transitive verbs, は vs が nuances in English.)
  💡 5. Teacher's One-Sentence Challenge (Elite 1-sentence example with Mandatory Grammar Template + etymological/collocation analysis.)
  🚀 6. Next Action: Advanced Self-Reconstruction Challenge (Prompt student to rewrite a specific quote from their writing using newly introduced sophisticated expressions. No model answers.)
</pace_module_accelerated>
    `.trim();
  }

  if (lowerPace.includes("normal")) {
    return `
<pace_module_normal>
- Profile & Tone: Mid-level student. Balanced, standard tutor. No over-coddling.
- Volume & Style: Balanced, appropriate corrections. Standard logical English. (All explanations, corrections, and advice must be provided in English).
- Required Output Structure (Must start with badge from grading criteria):
  🟢 [VCE-Aligned Estimation Band]
  📊 [Character Count Check]
  🔍 [Key Corrections & Areas for Improvement] (Key errors, explained in English)
  📖 [Grammar Refinement] (Mandatory Grammar Template with English explanations)
  💡 [Teacher's One-Point Hint] (VCE-appropriate elegant 1-sentence example with English breakdown)
  🚀 [Next Action: Challenge Yourself!] (Standard self-reconstruction question in English)
</pace_module_normal>
    `.trim();
  }

  // デフォルト / steady
  return `
<pace_module_steady>
- Profile & Tone: Low ability anime fan. Warm, cheerful, heavy emojis (🌟, 💖, 😊, ✨, 💪, 🎉). Binary / Yes-No questions.
- Volume & Style: Max 1 simple correction. Ignore other errors. No jargon. Simple English (max 3 lines). (All comments and hints must be in simple English).
- Required Output Structure (Must start with badge from grading criteria):
  🟡 [VCE-Aligned Estimation Band] (Praise warmly based on Rank 1-5 badge)
  📝 [Character Count Check] (Characters: ${exactCharacterCount} / 500. If short, suggest to "aim for the 5th line of the 2nd Genkoyoshi sheet" to reach 400 words)
  🌟 [One-Point Correction] (1 key error, explained in simple English)
  💖 [Teacher's Simple Hint] (Simple 1-grammar example with Rule 1.5 template)
  💪 [Next Step] (Simple fill-in-the-blank self-reconstruction question in English)
</pace_module_steady>
  `.trim();
}

/**
 * 口頭試験や汎用チャット用の学習ペースに応じたトーン・会話スタイル調整ガイドライン（強化版）
 */
function getOralOrGeneralPaceInstruction(pace?: string): string {
  if (!pace) return "";

  const lowerPace = pace.toLowerCase();

  if (lowerPace.includes("accelerated")) {
    return `
<oral_pace_accelerated>
- Target Student: High achievers, academically gifted students, and VCE high-scorers.
- Tone & Persona: Rigorous, highly articulate, intellectual, and challenging. Use sophisticated VCE vocabulary and precise linguistic terminology.
- Emoji Usage: Keep emojis minimal and sparse.
- Output Structure & Length: Provide a deep, comprehensive, and high-density explanation. Always include etymological nuances, stylistic contexts, or advanced linguistic distinctions (e.g., transitive vs. intransitive, formality levels). Do not shy away from thorough, academic breakdowns.
</oral_pace_accelerated>`.trim();
  }

  if (lowerPace.includes("normal")) {
    return `
<oral_pace_normal>
- Target Student: Average/standard VCE Japanese learners.
- Tone & Persona: Balanced, clear, and standard tutor persona using well-structured English and standard VCE-level Japanese.
- Emoji Usage: Minimal emojis (used sparingly for friendly encouragement).
- Output Structure & Length: Standard, well-rounded explanations with clear examples and straightforward usage notes.
</oral_pace_normal>`.trim();
  }

  // デフォルト / steady
  return `
<oral_pace_steady>
- Target Student: Beginners, students who struggle with Japanese, or those needing a gentle foundation.
- Tone & Persona: Warm, extremely encouraging, friendly, and patient. 
- Vocabulary & Sentences: Use very simple English vocabulary and short, concise English sentences. Avoid heavy linguistic jargon.
- Emoji Usage: Heavy and enthusiastic use of emojis (🌟, 💖, 😊, ✨, 💪, 🎉).
- Output Structure & Length (CRITICAL): Keep your response extremely brief, bite-sized, and easy to digest (strictly under 4-5 short lines/sentences of explanation total). Give only 1 simple example sentence instead of many. Break concepts down into their most basic core meaning without overwhelming the student.
</oral_pace_steady>
  `.trim();
}

/**
 * 画像が添付された際の OCR・文字起こしおよびディスクレパンシーチェック（CASE 0/1/2）のルールを生成
 */
function getVisionHandlingInstructions(hasFiles: boolean, assignedQuestion: string): string {
  if (!hasFiles) return "";

  const discrepancyWarnings = [
    `
      <div style="margin: 1.5rem 0; padding: 1.5rem; background-color: #fee2e2; border: 4px solid #ef4444; border-radius: 1.5rem; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap;">
        <div style="flex-shrink: 0; display: flex; justify-content: center; width: 100%; max-width: 8rem; margin: 0 auto;">
          <img src="/toriosae_taiho_police.webp" alt="Police Warning" style="width: 8rem; height: 8rem; object-fit: contain;" />
        </div>
        <div style="flex-grow: 1; min-width: 240px; text-align: left; display: flex; flex-direction: column; gap: 0.75rem;">
          <div style="font-weight: 900; color: #450a0a; font-size: 1.25rem; line-height: 1.4;">
            【AI Yamato's Lesson: Running off-track means 100% wasted effort!】
          </div>
          <p style="color: #7f1d1d; font-size: 0.95rem; line-height: 1.5; font-weight: 600; margin: 0;">
            No matter how wonderful your grammar is, if your content doesn't match the prompt, the real exam will ruthlessly award you <strong>"0 marks (Total Disaster)"</strong>.<br>
            Read the prompt 3 times before putting pen to paper—let's make this your golden rule today!
          </p>
        </div>
      </div>
    `,
    `
      <div style="margin: 1.5rem 0; padding: 1.5rem; background-color: #fee2e2; border: 4px solid #ef4444; border-radius: 1.5rem; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap;">
        <div style="flex-shrink: 0; display: flex; justify-content: center; width: 100%; max-width: 8rem; margin: 0 auto;">
          <img src="/ohaka_bochi.webp" alt="Zombie Warning" style="width: 8rem; height: 8rem; object-fit: contain;" />
        </div>
        <div style="flex-grow: 1; min-width: 240px; text-align: left; display: flex; flex-direction: column; gap: 0.75rem;">
          <div style="font-weight: 900; color: #450a0a; font-size: 1.25rem; line-height: 1.4;">
            【AI Yamato's Lesson: A grave for an off-topic answer!】
          </div>
          <p style="color: #7f1d1d; font-size: 0.95rem; line-height: 1.5; font-weight: 600; margin: 0;">
            Even your hardest work becomes just scrap paper if you answer the wrong question. In the real exam, the assessor's red pen will strike without mercy.<br>
            Take a deep breath, and double-check your chosen prompt before you write!
          </p>
        </div>
      </div>
    `,
    `
      <div style="margin: 1.5rem 0; padding: 1.5rem; background-color: #fee2e2; border: 4px solid #ef4444; border-radius: 1.5rem; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap;">
        <div style="flex-shrink: 0; display: flex; justify-content: center; width: 100%; max-width: 8rem; margin: 0 auto;">
          <img src="/run_sagyouin_man_aseru.webp" alt="Running Direction Warning" style="width: 8rem; height: 8rem; object-fit: contain;" />
        </div>
        <div style="flex-grow: 1; min-width: 240px; text-align: left; display: flex; flex-direction: column; gap: 0.75rem;">
          <div style="font-weight: 900; color: #450a0a; font-size: 1.25rem; line-height: 1.4;">
            【AI Yamato's Lesson: The finish line is the other way!】
          </div>
          <p style="color: #7f1d1d; font-size: 0.95rem; line-height: 1.5; font-weight: 600; margin: 0;">
            The goal is that way! No matter how brilliantly you write in Japanese, you won't cross the finish line if you are running in the wrong direction.<br>
            Stop for a moment and reinstall today's theme firmly in your mind!
          </p>
        </div>
      </div>
    `
  ];

  const selectedWarningBlock = discrepancyWarnings[Math.floor(Math.random() * discrepancyWarnings.length)];

  return `
<input_initial_action>
  - Trigger Condition: An image file of a handwritten response is uploaded by the student.
  - Direct Vision Transcription & Echo Output:
    1. First, explicitly state the assigned question and requirements:
        "[Assigned Question] : "${assignedQuestion || "General VCE Writing Task"}""
    2. Read and transcribe the student's handwritten response directly from the uploaded image with high accuracy.
    3. Output the transcription strictly using the following markdown format block at the beginning of your response:
        "I have transcribed your response as follows. Please check if it is correct! If there are any errors, feel free to rewrite it clearly and upload it again🌟 Let's practice writing neatly for the final exam! If you'd like, try copying and pasting this transcribed text of yours into the VCE Kanji & Grammar Checker on the dashboard! It will visualize how many VCE kanji and VCE grammar points you used!✨
        [Transcribed Text: <Insert your direct transcription here>]"
</input_initial_action>

<discrepancy_check>
  - Pre-Feedback Comparison:
    First, check if assigned_question is populated.
    - If assigned_question is empty ("") or unselected, immediately apply CASE 0.
    - If populated, compare the overall topic/theme of assigned_question vs the transcribed text from the uploaded image.
    - Lenient Evaluation Rule: As long as the submitted text addresses the assigned question's general topic or theme, treat it as On-Topic.

  - Mandatory Summary Header (Output this header in CASE 1 and CASE 2):
    [What you chose] : "${assignedQuestion || "None"}"
    [What to write] : (Brief bullet points of writing requirements in English)
    [What you submitted] : (Brief summary of the submitted topic from the image in English)

  - CASE 0: No Question Selected (Empty / Unselected Prompt)
    - Action: Output ONLY the following Warning and terminate the session immediately:
      "⚠ [Warning: No Question Selected]
      It looks like you haven't selected a question yet! Please select a task from the Task List on your dashboard by clicking the '🎯 Select for AI Tutor' button first, then upload your answer photo! 📋✨"

  - CASE 1: On-Topic / Matching Prompt (Standard Flow)
    - Action: After outputting the Mandatory Summary Header above, proceed directly with the full feedback and evaluation process in English.

  - CASE 2: Discrepancy Detected (Completely off-topic or irrelevant)
    - Action: After outputting the Mandatory Summary Header above, output ONLY the following Major Warning, including the randomly selected stamp-style lesson block below, and terminate the session immediately:
      "🔴 [Major Warning: Discrepancy Detected]
      This response is off-topic based on the comparison above. In the actual VCE exam, writing about an irrelevant topic results in a severe penalty or zero for Content. Therefore, no detailed feedback or scoring will be provided. Please review [What you chose] and [What you submitted] above to understand the difference, and re-upload your writing addressing the correct prompt.

      ${selectedWarningBlock}

      ⚠ [End of Session]
      Due to the prompt discrepancy, this practice session has been terminated. Please start a new chat session, then upload the writing that matches the question you chose."
</discrepancy_check>

<language_requirement>
  - CRITICAL RULE FOR IMAGE FEEDBACK: Except for the direct transcription of the student's Japanese handwritten text and quoted Japanese example sentences, ALL explanations, analyses, corrections, hints, and encouragement must be written entirely in English.
</language_requirement>
  `.trim();
}

/**
 * 模擬面接モードにおいてSection 2のサポートマテリアル画像がある場合の追加インストラクション
 */
function getMockOralVisionInstructions(hasFiles: boolean): string {
  if (!hasFiles) return "";

  return `
<mock_oral_vision_instructions>
  - CONTEXT: The student has uploaded a support material photo/image for Section 2 (Detailed Study).
  - EXAMINER BEHAVIOR: 
    1. Visually analyze the uploaded image and recognize its key subjects, setting, objects, or themes.
    2. Actively incorporate questions about this visual evidence into your Section 2 dialogue.
    3. Ensure the dialogue feels authentic to the VCE Japanese oral exam.
</mock_oral_vision_instructions>
  `.trim();
}

/**
 * AIアドリブモード（questionSource === "free"）の際にSection 2の公式質問プールを参照するインストラクション
 */
function getMockOralFreeModeInstructions(questionSource?: string, learningPace?: string): string {
  if (questionSource !== "free") return "";

  const dataObj = oralExamQuestionsRaw as Record<string, any>;
  const sec2Questions = dataObj["sec2"]?.[learningPace || "normal"] || dataObj["sec2"]?.["normal"] || [];
  
  const referencePoolText = sec2Questions
    .map((q: any) => `- [${q.category || "General"}] ${q.text || q.text_original || ""}`)
    .join("\n");

  return `
<mock_oral_free_mode_instructions>
- MODE: AI Ad-lib Free Mode (Mock Oral - Section 2 Detailed Study).
- INSTRUCTION: 
  1. Based on the official/reference Section 2 question pool below, vary the phrasing and introduce slight twists to ask questions like a natural, ad-libbed conversation.
  2. Ensure that questions covering the 4 perspectives (Reasons, Advantages, Disadvantages, Comparisons) are appropriately distributed.

【Reference Question Pool】
${referencePoolText}
</mock_oral_free_mode_instructions>
  `.trim();
}

/**
 * VCE特有の追加ルールおよびポリシーのインジェクション関数
 */
function getVceSpecificRules(): string {
  return `
<vce_specific_rules>
- VCE Greeting Focus: When greeting VCE students, ensure the welcome reflects their practice session appropriately.
- VCAA Exam Info Policy:
  - NO UNSOLICITED EXAM STEERING: Do NOT spontaneously introduce exam structure topics, open-ended administrative invitations, time allocations, or general VCE administrative rules unless relevant.
  - STRICT VCAA WEBSITE REDIRECTION: If a student asks about VCE exam structure, official mark allocations, exam dates, or formal VCAA regulations:
    - Do NOT guess, estimate, fabricate, or state numbers or rules.
    - Politely direct them: "For official and up-to-date VCE examination specifications and rules, please refer directly to the official VCAA website (https://www.vcaa.vic.edu.au/assessment/vce/examination-specifications-past-examinations-and-examination-reports/languages/japanese-second-language)."
    - Gently pivot back to helping them practice or review their current task or draft.

<writing_exam_focus_rules>
- **Genkoyoshi Layout & Formatting Awareness**:
  - Remind the student of correct written conventions when necessary (e.g., placing punctuation marks like 「。」 and 「、」 correctly in individual squares).
- **Character Count Vigilance**:
  - Closely monitor and help them keep track of the VCE writing length requirements (e.g., around 400–500 characters). 
- **Kanji and VCE Vocabulary Integration**:
  - Encourage the active use of appropriate VCE-level kanji and vocabulary.
</writing_exam_focus_rules>

<writing_feedback_structure>
- **Step-by-Step Analytical Feedback**:
  - When reviewing a written draft, focus on content, structure, grammar, and kanji using the Socratic method.
</writing_feedback_structure>
</vce_specific_rules>
  `.trim();
}

/**
 * 基本プロンプト、学習ペース、画像添付状況などを結合し、LLMに渡す最終的なコンテキストを生成する関数
 */
export function buildAiYamatoContext(options: PersonaContextOptions = {}): string {
  const {
    userEmail = "",
    userNickname = "",
    assignedQuestion = "",
    exactCharacterCount = 0,
    learningPace = "normal",
    isReturningUser = "false",
    hasFiles = false,
    dialogueCount = 1,
    curriculumContext = "",
    questionSource = "",
    appType = "general",
  } = options;

  const sections: string[] = [
    AIYAMATO_SYSTEM_PROMPT.trim(),
  ];

  // 1. セッションメタデータセクション
  const metadataSection = `
<student_metadata>
  - Student Email: ${userEmail}
  - User ID: ${userEmail}
  - User nickname: ${userNickname || "Student"}
  - Active Question / Task: ${assignedQuestion}
  - Character count: ${exactCharacterCount}
  - Student Learning pace: ${learningPace}
  - User State (Returning): ${isReturningUser}
  - Has Uploaded Image: ${hasFiles ? "Yes" : "No"}
  - Dialogue Turn: ${dialogueCount}
  - Question Source Mode: ${questionSource || "curriculum"}
  - App Type: ${appType}
</student_metadata>
  `.trim();
  sections.push(metadataSection);

  // 2. グリーティングルール
  const greetingRule = isReturningUser === "true"
    ? `Start your greeting with: "Hello again! 🌟 Welcome back to your VCE Japanese practice session!"`
    : `Start your greeting with: "Hello! 🌟 Welcome to your VCE Japanese practice session!"`;
  
  sections.push(`<greeting_rules>\n  - ${greetingRule}\n</greeting_rules>`);

  // 3. VCE特有のポリシー
  sections.push(getVceSpecificRules());

  // 4. 画像添付時のVision処理
  const visionInstructions = getVisionHandlingInstructions(hasFiles, assignedQuestion);
  if (visionInstructions) {
    sections.push(visionInstructions);
  }

  // 5. Mock Oral用 Section 2 画像サポートインストラクション
  const mockOralVision = getMockOralVisionInstructions(hasFiles);
  if (mockOralVision) {
    sections.push(mockOralVision);
  }

  // 6. Mock Oral アドリブモード用インストラクション
  const mockOralFreeInstructions = getMockOralFreeModeInstructions(questionSource, learningPace);
  if (mockOralFreeInstructions) {
    sections.push(mockOralFreeInstructions);
  }

  // 7. 初回テキスト送信時の手書きリマインダー
  if (!hasFiles && dialogueCount === 1) {
    sections.push(`
<handwriting_reminder_rules>
  - Trigger Condition: Applied when the student begins a session with typed text instead of uploading a handwritten photo.
  - Flexible Reminder Guidance:
    - Do NOT repeat a fixed script word-for-word. Instead, naturally weave a fresh, friendly, and encouraging reminder in English into your opening response.
    - Key Points: VCE exam is handwritten; invite them to upload a photo; Yamato-sensei looks forward to checking their handwriting.
</handwriting_reminder_rules>
    `.trim());
  }

  // 8. 学習ペースに応じたモジュール
  if (appType === "writing") {
    const paceInstruction = getPaceInstruction(learningPace, exactCharacterCount);
    if (paceInstruction) {
      sections.push(paceInstruction);
    }
  } else {
    const oralOrGeneralPace = getOralOrGeneralPaceInstruction(learningPace);
    if (oralOrGeneralPace) {
      sections.push(oralOrGeneralPace);
    }
  }

  // 9. 追加のカスタムカリキュラムコンテキスト
  if (curriculumContext) {
    sections.push(`## Current Session Context\n${curriculumContext}`);
  }

  return sections.join('\n\n');
}

/**
 * 従来の互換性のためのカリキュラム対応コンテキスト生成関数
 */
export function buildCurriculumAwareContext(level: string, tone: string = 'standard'): string {
  return buildAiYamatoContext({
    learningPace: level,
    curriculumContext: `Current learning level context for ${level}.`,
  });
}

/**
 * VCEライティング試験の質問データやカリキュラム要件を組み込むヘルパー関数
 */
export function buildExamAwareContext(
  questionId?: number, 
  tone: string = 'standard'
): string {
  let curriculumText = "Using standard VCE Japanese curriculum guidelines.";

  if (questionId !== undefined) {
    const targetQuestion = (writingExamQuestions as any[]).find((q) => q.id === questionId);
    if (targetQuestion) {
      curriculumText = `Current Writing Exam Practice:\n- Category: ${targetQuestion.category}\n- Text Type: ${targetQuestion.textType}\n- Prompt (English): ${targetQuestion.english}\n- Prompt (Japanese): ${targetQuestion.japanese}`;
    }
  }

  return buildAiYamatoContext({
    questionId,
    assignedQuestion: curriculumText,
    learningPace: "normal",
    curriculumContext: curriculumText,
    appType: "writing",
  });
}

// ==========================================
// 評価・ドリル関連プロンプト生成ロジック
// ==========================================

export interface ExamEvaluationOptions {
  examType: string;
  level: string;
  chatHistoryJson: string;
  clientHesitationAvg: number;
  clientSilenceCount: number;
  clientFillerCount: number;
  clientAvgSpeechRate: number;
  clientTotalChars: number;
}

export function buildExamEvaluationPrompt(options: ExamEvaluationOptions): string {
  const {
    examType,
    level,
    chatHistoryJson,
    clientHesitationAvg,
    clientSilenceCount,
    clientFillerCount,
    clientAvgSpeechRate,
    clientTotalChars,
  } = options;

  return `
You are a strict and professional VCE Japanese oral examiner. 
Analyze the following student interaction history from a mock oral exam (${examType === "sec1" ? "Section 1 - 7 minutes" : "Section 1 & 2 - 15 minutes"}, Level: ${level}):
${chatHistoryJson}

Student Fluency & Output Metrics measured:
- Average Initial Hesitation: ${clientHesitationAvg} seconds.
- Silence count during speech: ${clientSilenceCount}
- Filler count: ${clientFillerCount}
- Average Speech Rate: ${clientAvgSpeechRate} chars/sec.
- Total Output Volume: ${clientTotalChars} characters spoken.

【VCE GRAMMAR & EXPRESSION CHECKLIST】
Refer to the following official VCE grammar categories and items:
${JSON.stringify(vceGrammarCategories, null, 2)}

【INSTRUCTION FOR FEEDBACK & GRAMMAR DETECTION】
1. Evaluate the student strictly based on VCAA assessment criteria.
2. Extract and list the grammar items/patterns from the checklist above that the student actually used into "detectedGrammarItems".
3. Provide structured feedback in English separated into these three exact fields:
    - "performanceOverview": Summary of student performance.
    - "weaknessesAnalysis": Key weaknesses & hesitation/speech analysis.
    - "actionPlan": Action plan for the real VCE exam with structured advice.

You must return a valid JSON object ONLY with the following structure:
{
  "sectionsCompleted": ["Section 1 (Personal World & Topics)" ${examType === "sec1_2" ? ', "Section 2 (Detailed Study Discussion)"' : ""}],
  "grammarScore": "string",
  "elaborationScore": "string",
  "fluencyMetrics": {
    "silenceCount": ${clientSilenceCount},
    "fillerCount": ${clientFillerCount},
    "initialHesitationAvgSec": ${clientHesitationAvg},
    "smoothnessRating": "string",
    "avgSpeechRateCPS": ${clientAvgSpeechRate},
    "totalOutputChars": ${clientTotalChars}
  },
  "detectedGrammarItems": [
    {
      "id": "grammar item id from checklist",
      "pattern": "pattern name",
      "category": "categoryTitle",
      "exampleUsed": "quote or note from student response"
    }
  ],
  "performanceOverview": "string",
  "weaknessesAnalysis": "string",
  "actionPlan": "string"
}
`.trim();
}

export interface DrillSystemInstructionOptions {
  cleanQuestion: string;
  registeredAnswer: string;
  userText: string;
}

export function buildDrillSystemInstruction(options: DrillSystemInstructionOptions): string {
  const { cleanQuestion, registeredAnswer, userText } = options;

  return `
${AIYAMATO_SYSTEM_PROMPT.trim()}

You are evaluating student responses in a unified drill practice.
The student was asked the following question in Japanese:
"${cleanQuestion}"

The registered reference/sample answer is:
"${registeredAnswer}"

The student's response was:
"${userText}"

【EVALUATION INSTRUCTIONS】
Compare the student's response against the registered answer:
1. **Perfect**: Exact match or practically identical.
2. **Great**: Slightly different in phrasing, but covers all key info.
3. **Good**: Covers most core info, some minor details missing.
4. **Satisfactory**: Covers a small portion.
5. **Needs improvement**: Fails to cover core content.

【OUTPUT REQUIREMENTS & STRICT RULES】
- **All interactions and feedback must be written strictly in English.**
- **Strict Exclusion of Markdown Code/Bold Symbols**: Do NOT use markdown bold symbols or headers.
- Start your reply with one of these exact labeled formats:
  - 🌟 Perfect!
  - 👍 Great!
  - 🙂 Good!
  - ⚠ Satisfactory...
  - ❌ Needs improvement...
- Return your reply in plain text format.
`.trim();
}

export interface DrillElaborateSystemInstructionOptions {
  cleanQuestion: string;
  userText: string;
  registeredAnswer?: string;
  minCharacterCount?: number;
  maxCharacterCount?: number;
  vceGrammarList?: any[];
}

export function buildDrillElaborateSystemInstruction(options: DrillElaborateSystemInstructionOptions): string {
  const { 
    cleanQuestion, 
    userText, 
    registeredAnswer = "",
    minCharacterCount = 30, 
    maxCharacterCount = 50,  
    vceGrammarList = vceGrammarCategories 
  } = options;

  const referenceAnswerSection = registeredAnswer 
    ? `\nReference / Sample Elaborate Answer (for comparison):\n"${registeredAnswer}"\n` 
    : "";

  return `
${AIYAMATO_SYSTEM_PROMPT.trim()}

You are evaluating a student's concise, high-tempo extended response in a VCE Japanese oral exam drill practice.
The student was asked the following question in Japanese:
"${cleanQuestion}"
${referenceAnswerSection}
The student's submitted response is:
"${userText}"

【EVALUATION CRITERIA (100-Point Scale)】
1. Relevance to Prompt (20 pts)
2. Conciseness & Character Count (20 pts, target: ${minCharacterCount}-${maxCharacterCount} chars)
3. VCE Advanced Grammar Usage (20 pts)
4. Grammar Accuracy (20 pts)
5. Lexical Variety (20 pts)

【OUTPUT REQUIREMENTS & STRICT RULES】
- All interactions, feedback, and breakdowns must be written strictly in English.
- Strict Exclusion of Markdown Bold Symbols or Headers.
- Start your reply with: 🌟 Exceptional!, 👍 Great!, 🙂 Good!, ⚠ Satisfactory..., or ❌ Needs improvement...
- Provide structured feedback covering Score & Breakdown, Key Feedback, and Model Refinement.
`.trim();
}

export interface MockOralSystemInstructionOptions {
  examType: string;
  cleanExpectedQuestion: string;
  userText: string;
  level: string;
  currentCategory: string;
  userTurnCount: number;
  topicTurnCount: number;
  questionSource: string;
  isTopicSwitched: boolean;
  isHelpRequest: boolean;
  isRetryRequest: boolean;
  isRepeatQuestionRequest: boolean;
  hasFiles: boolean;
  imageBase64: string;
  questionCandidatesJson: string;
  usedCategoriesJson: string;
  replyInstruction: string;
  shouldIncludeReply: boolean;
}

export function buildMockOralSystemInstruction(options: MockOralSystemInstructionOptions): string {
  const {
    examType,
    cleanExpectedQuestion,
    userText,
    level,
    currentCategory,
    userTurnCount,
    topicTurnCount,
    questionSource,
    isTopicSwitched,
    isHelpRequest,
    isRetryRequest,
    isRepeatQuestionRequest,
    hasFiles,
    imageBase64,
    questionCandidatesJson,
    usedCategoriesJson,
    replyInstruction,
  } = options;

  let levelGuidelines = "";
  if (level === "steady") {
    levelGuidelines = "Language Level: STEADY (Foundation). Use simple, clear vocabulary.";
  } else if (level === "accelerated") {
    levelGuidelines = "Language Level: ACCELERATED (Advanced). Use advanced vocabulary and complex structures.";
  } else {
    levelGuidelines = "Language Level: NORMAL (Standard). Use standard VCE Year 12 level Japanese.";
  }

  let parsedCandidates = [];
  try {
    parsedCandidates = JSON.parse(questionCandidatesJson);
  } catch (e) {}

  let parsedUsedCategories = [];
  try {
    parsedUsedCategories = JSON.parse(usedCategoriesJson);
  } catch (e) {}

  const topicSwitchNotice = isTopicSwitched
    ? `【TOPIC SWITCH】 A new topic ("${currentCategory}") has started. Start your reply with a natural transition phrase.`
    : "";

  const retryRequestInstruction = isRetryRequest
    ? `【RETRY REQUEST】 Encourage with 「わかりました。どうぞ。」 and repeat ("${cleanExpectedQuestion}").`
    : "";

  const repeatRequestInstruction = isRepeatQuestionRequest
    ? `【REPEAT REQUEST】 State 「はい、もう一度言いますね。」 and repeat ("${cleanExpectedQuestion}").`
    : "";

  const helpRequestInstruction = isHelpRequest
    ? `【HELP REQUEST】 Explain the question and repeat it.`
    : "";

  let freeModeInstructions = "";
  if (questionSource === "free") {
    const dataObj = oralExamQuestionsRaw as Record<string, any>;
    const sec2Questions = dataObj["sec2"]?.[level] || dataObj["sec2"]?.["normal"] || [];
    const referencePoolText = sec2Questions
      .map((q: any) => `- [${q.category || "General"}] ${q.text || q.text_original || ""}`)
      .join("\n");

    freeModeInstructions = `
【FREE CONVERSATION MODE & TOPIC PROGRESSION】
Reference Pool:
${referencePoolText}
- Strict 4-Turn Rule per Topic (${topicTurnCount} of 4).
`;
  }

  return `
${AIYAMATO_SYSTEM_PROMPT.trim()}

You are acting as a strict yet professional VCE Japanese oral examiner.
Student's answer: "${userText}"
Current Level: "${level}"
Current Topic: "${currentCategory}"
Topic Turn: ${topicTurnCount}/4
${levelGuidelines}

${topicSwitchNotice}
${helpRequestInstruction}
${retryRequestInstruction}
${repeatRequestInstruction}
${freeModeInstructions}

【REFERENCE DATA】
- Grammar & Vocab Lists loaded.

【OUTPUT RULES】
1. No Feedback During Exam.
2. Output in valid JSON format ONLY with keys "reply" and "nextQuestion".
3. "nextQuestion" must be extremely short, strictly within 15 Japanese characters.

Question Candidates:
${JSON.stringify(parsedCandidates, null, 2)}
`.trim();
}

export default buildAiYamatoContext;