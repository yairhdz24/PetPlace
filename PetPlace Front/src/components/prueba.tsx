import * as React from "react";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, className }) => {
  return <div className={`justify-center px-12 py-7 text-xl leading-9 bg-yellow-400 rounded-2xl shadow-2xl text-neutral-900 max-md:px-5 ${className}`}>{children}</div>;
};

interface TagProps {
  children: React.ReactNode;
  className?: string;
}

const Tag: React.FC<TagProps> = ({ children, className }) => {
  return <div className={`justify-center px-7 py-2 bg-gray-800 rounded-[100px] max-md:px-5 ${className}`}>{children}</div>;
};

const tags = [
  { label: "Investment DAO", color: "text-pink-300" },
  { label: "Startup DAO", color: "text-amber-300" },
  { label: "Service DAO", color: "text-purple-400" },
  { label: "Community DAO", color: "text-cyan-300" },
  { label: "Impact DAO", color: "text-cyan-400" },
  { label: "DeFi DAO", color: "text-red-300" },
];

export function Prueba() {
  return (
    <div className="flex justify-center items-center px-16 py-20 font-bold text-center bg-gray-950 max-md:px-5">
      <div className="flex flex-col items-center mt-14 max-w-full w-[1140px] max-md:mt-10">
        <h1 className="text-7xl tracking-wider text-white leading-[82px] max-md:max-w-full max-md:text-4xl max-md:leading-[50px]">
          The easiest way to go from design to code
        </h1>
        <p className="mt-9 text-2xl font-medium leading-8 text-white max-md:max-w-full">
          An all-in-one platform to start, manage and grow a decentralized autonomous organization
        </p>
        <Button className="mt-20 max-md:mt-10">Get started</Button>
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/386a9aea12d590711ac4e8685163f48014aa31506bafd1f2d7c8bda68cb708f6?apiKey=07f08715951c448ab6dd695170eb5084&" alt="" className="mt-28 aspect-[0.96] w-[23px] max-md:mt-10" />
        <section className="flex flex-col self-stretch px-20 mt-12 text-xl font-semibold leading-10 max-md:px-5 max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 mx-4 text-6xl font-bold leading-[79.92px] text-neutral-200 max-md:flex-wrap max-md:mr-2.5 max-md:max-w-full max-md:text-4xl">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/6d870eb288557c230b9bb212a5061fcaaeb8a285fc2c06792b8192f49826c37c?apiKey=07f08715951c448ab6dd695170eb5084&" alt="" className="shrink-0 aspect-[0.99] w-[88px]" />
            <h2 className="flex-auto self-end mt-8 max-md:max-w-full max-md:text-4xl">Ready for every project</h2>
          </div>
          <div className="flex gap-5 justify-between self-end mt-12 max-md:flex-wrap max-md:mt-10 max-md:mr-2.5">
            {tags.slice(0, 4).map((tag) => (
              <Tag key={tag.label} className={tag.color}>
                {tag.label}
              </Tag>
            ))}
          </div>
          <div className="flex gap-5 justify-between self-center mt-6 max-md:flex-wrap">
            {tags.slice(4).map((tag) => (
              <Tag key={tag.label} className={tag.color}>
                {tag.label}
              </Tag>
            ))}
            <Tag className="flex gap-2 justify-center font-bold whitespace-nowrap text-slate-500">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/35238d5c0fce1a5e0ea8493e0d4147894aacc1869868a0db03ed1c4862fce9ec?apiKey=07f08715951c448ab6dd695170eb5084&"
                alt=""
                className="shrink-0 my-auto w-4 border-2 border-solid aspect-square border-slate-600 stroke-[2.273px] stroke-slate-600"
              />
              <span>More</span>
            </Tag>
          </div>
        </section>
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/1e193ee3f13ec0e6e1ef6f9ac488d295c4c298e82353ab631f02cf7053581ac8?apiKey=07f08715951c448ab6dd695170eb5084&" alt="" className="self-stretch mt-11 w-full aspect-[2.33] max-md:mt-10 max-md:max-w-full" />
        <div className="justify-center px-6 py-1.5 mt-5 text-lg leading-8 bg-amber-500 border-4 border-solid border-gray-950 rounded-[100px] text-gray-950 max-md:px-5">
          1000+ projects launched on Superdao
        </div>
      </div>
    </div>
  );
}
