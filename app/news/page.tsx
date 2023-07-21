import ClientProtectedPage from "../protected/client/page";

// obviously move this into datebase..
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
  {
    title: "0.1.1 Update - Invites, Limited Groups, and more",
    date: "21/07/23",
    content: `Ahoy\n
How's it going?

I've been working on Friend Lab a bit more, and I've got some new features to show you.

You can now authenticate with Google, and you can now share your invite link with friends and family. They will appear in your friends list.

Adding people to groups is coming soon.

Then, scheduling events.

Then, iterate iterate iterate.

Sean
`,
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
          {news.map((n, i) => {
            return (
              <>
                <h2 className="text-xl">{n.title}</h2>
                <p className="italic">{n.date}</p>
                <p className="mt-2 whitespace-pre-wrap">{n.content}</p>
                <br></br>
              </>
            );
          })}
        </div>
      </div>
    </ClientProtectedPage>
  );
};

export default NewsPage;
