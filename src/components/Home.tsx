import * as React from "react";
import { hipsterPhrases, techPhrases } from "./data";
import Layout from "./Layout";

type DataType = { id: string; title: string; summary: string };

export default function Home() {
  const [data, setData] = React.useState<DataType[]>([]);
  const observer = React.useRef(null);
  const lastElementRef = React.useRef(null);

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
