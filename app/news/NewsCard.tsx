import { Cross1Icon, MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import ButtonTray from "../components/ButtonTray";
import { CircleButtonInset } from "../components/Form/button";

const defaultNews = {
  title: "Title",
  subtitle: "Subtitle",
  date: new Date().toLocaleDateString(),
  text: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl quis tincidunt aliquam, nisl nisl lacinia nisl, nec lacinia nisl",
};

const NewsCard = ({ news = defaultNews }) => {
  return (
    <>
      <ButtonTray>
        <button>News</button>
      </ButtonTray>
      <div className="card">
        <div className="card-body">
          <div className="card-title flex flex-row justify-between">
            <h2>{news.title}</h2>
            <div>
              <CircleButtonInset small>
                <Cross1Icon className="h-6 w-6 text-error" />
              </CircleButtonInset>
              <CircleButtonInset small>
                <MinusIcon className="h-6 w-6 text-warning" />
              </CircleButtonInset>
              <CircleButtonInset small>
                <PlusIcon className="h-6 w-6 text-success" />
              </CircleButtonInset>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <p className="text-bold">{news.subtitle}</p>
            <div>{news.date}</div>
          </div>
          <div className="divider"></div>
          <div className="prose">{news.text}</div>
        </div>
      </div>
    </>
  );
};

export default NewsCard;
