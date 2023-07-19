import ClientProtectedPage from "../protected/client/page";

const news = [
  {
    title: "0.1.0 Pre-Alpha Launch 🎉🎉🎉",
    date: "18/07/23",
    content: `Hello people

This is a a project about bringing people together. It doesn't really work right now, and I'm sure it will look very different in the future. I have big dreams for what it might become.

If you want to help out, just shoot me a message at sean@friendlab.co.uk about why you want to help and what you think you can bring to Friend Lab.

Cheers,

Sean`,
  },
];

const NewsPage = () => {
  return (
    <ClientProtectedPage>
      <div className="card w-11/12 mx-auto my-4 bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="card-title">Friend Lab News</h1>
          <p>Catch the latest news about Friend Lab here</p>
          <br></br>
          <h2 className="text-xl">0.1.0 Pre-Alpha Launch 🎉🎉🎉</h2>
          <p className="italic">18/07/23</p>
          <p className="mt-2 whitespace-pre-wrap">{news[0].content}</p>
        </div>
      </div>
    </ClientProtectedPage>
  );
};

export default NewsPage;
