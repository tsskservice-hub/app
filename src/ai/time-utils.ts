/**
 * @file time-utils.ts
 * @description 汎用的な日時・タイムゾーン管理ユーティリティ（天気情報統合版・単独プロジェクト対応）
 */

import { getCityWeatherContext } from './weather-utils.js';

/**
 * 指定したタイムゾーンの現在時刻をフォーマットして取得する
 */
export function getFormattedTimeForZone(timeZone: string, targetDate: Date | string = new Date()): string {
  const dateObj = typeof targetDate === 'string' ? new Date(targetDate) : targetDate;

  const formatter = new Intl.DateTimeFormat('ja-JP', {
    timeZone: timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  return formatter.format(dateObj);
}

/**
 * メルボルンの現在時刻をAI用のコンテキスト文字列として取得する
 */
export function getMelbourneTimeContext(overrideDateStr?: string): string {
  const formattedString = getFormattedTimeForZone('Australia/Melbourne', overrideDateStr);

  return `【現在の時間コンテキスト】\n現在時刻（オーストラリア・メルボルン）: ${formattedString}\nこの時間・曜日・季節の文脈を意識して、生徒への声かけや指導を行ってください。`;
}

/**
 * AIに渡すシステムプロンプトに時間コンテキストを埋め込む
 */
export function buildSystemInstructionWithTime(
  baseSystemPrompt: string,
  debugOverrideTime?: string
): string {
  const timeContext = getMelbourneTimeContext(debugOverrideTestOrOverrideDate(debugOverrideTime));
  return `${baseSystemPrompt}\n\n--- \n${timeContext}`;
}

// 互換性のための補助関数（必要に応じて overrideDateStr を処理）
function debugOverrideTestOrOverrideDate(overrideDateStr?: string): string | undefined {
  return overrideDateStr;
}

/**
 * AIに渡すシステムプロンプトに、時間と天気（指定都市基準）のコンテキストを非同期で埋め込む
 */
export async function buildSystemInstructionWithTimeAndWeather(
  baseSystemPrompt: string,
  debugOverrideTime?: string,
  cityKeyOrName: string = 'melbourne',
  fetchWeatherFn?: (city: string) => Promise<string | null>
): Promise<string> {
  const timeContext = getMelbourneTimeContext(debugOverrideTime);
  
  // 外部からカスタムの天気取得関数が渡されていればそれを優先、なければ weather-utils.ts の関数を使用
  let weatherContext: string | null = null;
  if (fetchWeatherFn) {
    weatherContext = await fetchWeatherFn(cityKeyOrName);
  } else {
    try {
      weatherContext = await getCityWeatherContext(cityKeyOrName);
    } catch {
      weatherContext = null;
    }
  }

  let environmentalContext = `--- \n${timeContext}`;

  if (weatherContext) {
    environmentalContext += `\n${weatherContext}\n現在の天気・気温のニュアンスも自然な会話の中に軽く織り交ぜて、親しみのある温かい声かけを行ってください。`;
  }

  return `${baseSystemPrompt}\n\n${environmentalContext}`;
}