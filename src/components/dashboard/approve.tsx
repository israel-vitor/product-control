import { Button } from "@/components/common/button";
import { handleApproveProductModification } from "@/lib/data";

export default async function ApproveForm({
  modificationId,
}: {
  modificationId: string;
}) {
  return (
    <form action={handleApproveProductModification}>
      <input
        id="modification_id"
        name="modification_id"
        type="text"
        defaultValue={modificationId}
        hidden
      />
      <Button type="submit">Approve</Button>
    </form>
  );
}
