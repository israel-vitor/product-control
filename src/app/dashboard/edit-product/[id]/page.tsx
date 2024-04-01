import EditForm from "@/components/dashboard/edit-form";

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <EditForm productId={params.id} />
    </div>
  );
}
