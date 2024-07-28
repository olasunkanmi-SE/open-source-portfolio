import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { MarkDownPreview } from "~/components/MarkDownPreview";
import { IPostDraft } from "~/models/models";
import { PostService } from "~/repository/post.repository";
import { sessionManager } from "./login";

const postService = new PostService();

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const userId = await sessionManager.requireUserId(request);
  invariant(params.draftId, "draftId not found");
  const data: IPostDraft | null = await postService.getDraftById(Number(userId), Number(params.draftId));
  invariant(data, "draft does not exist");
  return json({ data });
};

export default function Draft() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="p-3  h-100">
      <div className="md-content" data-md-component="content">
        <div>
          <div>
            <h1 id="introduction-to-focus-selection">{data.data.title}</h1>
          </div>
          <p>
            <div className="mb-3">
              <MarkDownPreview markdown={data.data.content} />
            </div>
          </p>
        </div>
      </div>
    </div>
  );
}
