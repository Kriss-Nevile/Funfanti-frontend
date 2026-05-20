import {
  interests,
  onboardingSlides,
  questionSets,
  quizQuestions,
  stats,
} from '../data/funfantiContent';

type JsonRecord = Record<string, unknown>;

type BootstrapPayload = {
  questionSets: typeof questionSets;
  quizQuestions: typeof quizQuestions;
  stats: typeof stats;
  interests: typeof interests;
  onboardingSlides: typeof onboardingSlides;
  profile: {
    displayName: string;
    email: string;
  };
};

const apiBaseUrl = (process.env.EXPO_PUBLIC_API_BASE_URL ?? 'http://localhost:3000').replace(
  /\/$/,
  '',
);

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(`${apiBaseUrl}${path}`, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...(init?.headers ?? {}),
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return (await response.json()) as T;
  } finally {
    clearTimeout(timeoutId);
  }
}

function withFallback<T>(fallback: T, loader: () => Promise<T>): Promise<T> {
  return loader().catch(() => fallback);
}

export const funfantiApi = {
  bootstrap: (): Promise<BootstrapPayload> => {
    return withFallback(
      {
        questionSets,
        quizQuestions,
        stats,
        interests,
        onboardingSlides,
        profile: {
          displayName: 'John Doe',
          email: 'john.doe@gmail.com',
        },
      },
      async () => {
        const remoteQuestionSets = await requestJson<JsonRecord[]>('/question-sets');

        return {
          questionSets:
            remoteQuestionSets.length > 0
              ? questionSets.map((set, index) => ({
                  ...set,
                  title: String(remoteQuestionSets[index]?.title ?? set.title),
                  subtitle: String(remoteQuestionSets[index]?.description ?? set.subtitle),
                }))
              : questionSets,
          quizQuestions,
          stats,
          interests,
          onboardingSlides,
          profile: {
            displayName: 'John Doe',
            email: 'john.doe@gmail.com',
          },
        };
      },
    );
  },
  login: (email: string, password: string) =>
    withFallback(
      { accessToken: 'mock-token', email },
      () =>
        requestJson<{ accessToken: string; email: string }>('/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
        }),
    ),
  register: (payload: { email: string; password: string; displayName: string }) =>
    withFallback(
      { accessToken: 'mock-token', email: payload.email },
      () =>
        requestJson<{ accessToken: string; email: string }>('/auth/register', {
          method: 'POST',
          body: JSON.stringify(payload),
        }),
    ),
  submitQuizSession: (payload: JsonRecord) =>
    withFallback(
      { score: 3, status: 'COMPLETED' },
      () =>
        requestJson<JsonRecord>('/quiz-sessions/mock-session-id/submit', {
          method: 'POST',
          body: JSON.stringify(payload),
        }),
    ),
  updatePreferences: (payload: JsonRecord) =>
    withFallback(
      { ok: true },
      () =>
        requestJson<JsonRecord>('/users/me/preferences', {
          method: 'PUT',
          body: JSON.stringify(payload),
          headers: {
            Authorization: 'Bearer mock-token',
          },
        }),
    ),
};
