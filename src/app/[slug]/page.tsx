/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
const Page = async ({ params }: any) => {
  // Đảm bảo params đã được awaited
  const { slug } = await params;

  return <div>Page {slug}</div>;
};

export default Page;
