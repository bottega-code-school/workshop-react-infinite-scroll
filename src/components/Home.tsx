import * as React from "react";
import { hipsterPhrases, techPhrases } from "./data";
import Layout from "./Layout";

function generateData(numberOfItems = 15) {
  const data: { id: string; title: string; summary: string }[] = [];

  for (let i = 0; i < numberOfItems; i++) {
    data.push({
      id: (Math.random() * 100000).toString(),
      title: techPhrases[Math.floor(Math.random() * techPhrases.length)],
      summary:
        hipsterPhrases[Math.floor(Math.random() * hipsterPhrases.length)],
    });
  }

  return data;
}

type DataType = { id: string; title: string; summary: string };

export default function Home() {
  const [data, setData] = React.useState<DataType[]>([]);
  const observer = React.useRef(null);
  const lastElementRef = React.useRef(null);

  React.useEffect(() => {
    setData(generateData());
  }, []);

  const fetchData = async () => {
    const newData = await generateData(20);
    setData((prevData) => [...prevData, ...newData]);
  };

  React.useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && lastElementRef.current) {
        fetchData();
      }
    });

    if (lastElementRef.current) {
      observer.current.observe(lastElementRef.current);
    }
  }, [data]);

  return (
    <Layout>
      <div className="list-content">
        {data?.map((item, index) => (
          <div
            className="item"
            key={index}
            ref={index === data.length - 1 ? lastElementRef : null}
          >
            <div className="row-content">
              <div className="title">{item.title}</div>
              <div className="description">{item.summary}</div>
            </div>
          </div>
        ))}
        <div className="counter">Total items: {data?.length}</div>
      </div>
    </Layout>
  );
}
