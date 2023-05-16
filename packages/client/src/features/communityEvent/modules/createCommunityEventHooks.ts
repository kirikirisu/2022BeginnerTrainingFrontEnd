import { ApiError, CommunityEvent } from "api-server";
import { useCallback, useState } from "react";
import { apiClient, handleApiError } from "../../../lib/api";

type CreateCommunityEventState =
  | {
      status: "initial";
      error: undefined;
    }
  | {
      status: "loading";
      error?: Error | ApiError;
    }
  | {
      status: "success";
      error: undefined;
    }
  | {
      status: "failed";
      error: Error | ApiError;
    };

const initialState: CreateCommunityEventState = {
  status: "initial",
  error: undefined,
};

export const useCreateCommunityEvent = () => {
  const [state] = useState<CreateCommunityEventState>(initialState);

  const createCommunityEvent = useCallback(
    async ({
      communityId,
      name,
      details,
      holdAt,
      category,
    }: {
      communityId: string;
      name: string;
      details: string;
      holdAt: Date;
      category: CommunityEvent["category"];
    }) => {
      const result = await apiClient.communityEvent
        .createCommunityEvent({
          communityId,
          requestBody: {
            name,
            details,
            holdAt: holdAt.getTime(),
            category,
          },
        })
        .catch(handleApiError);
      return result;
    },
    []
  );

  return {
    state,
    createCommunityEvent,
  };
};
