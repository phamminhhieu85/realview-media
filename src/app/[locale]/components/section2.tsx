"use client";

import AnimateInView from "@/components/animation";
import Image from "next/image";

interface Props {
  data: {
    header: string;
    title: string;
    description: string;
    commonServices: {
      title: string;
      description: string;
    }[];
    estateService: {
      title: string;
      description: string;
      linkDemo: string;
    };
  };
}

export default function Section2({ data }: Props) {
  return (
    <div className="container py-10 md:py-28 max-w-6xl">
      <AnimateInView offsetX={-50} className="space-y-4 mb-10">
        <p className="text-xl lg:text-xl font-medium">{data.header}</p>
        <p className="text-2xl md:text-4xl font-semibold ">{data.title}</p>
        <p className="md:text-lg text-muted-foreground">{data.description}</p>
      </AnimateInView>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
        <div className="rounded-xl relative border shadow-md hover:shadow-xl duration-200 ease-out cursor-pointer overflow-hidden shrink-0">
          <div className="aspect-[4/3] relative">
            <Image
              src="https://ik.imagekit.io/z7onzn8tx/Realview_Media/google-business.jpg?updatedAt=1714791848690"
              alt="Google Business"
              fill
              className="object-cover"
            />
          </div>
          <div className="rounded-xl bg-white/20 p-6 backdrop-blur-xl space-y-2 w-full -mt-5 ">
            <p className="text-xl xl:text-2xl font-medium">
              {data.commonServices[0].title}
            </p>
            <p className="text-muted-foreground">
              {data.commonServices[0].description}
            </p>
          </div>
        </div>

        <div className="rounded-xl relative border shadow-md hover:shadow-xl duration-200 ease-out cursor-pointer overflow-hidden shrink-0">
          <div className="aspect-[4/3] relative">
            <Image
              src="https://ik.imagekit.io/z7onzn8tx/Realview_Media/coffe-shop.jpg"
              alt="Google Business"
              fill
              className="object-cover"
            />
          </div>
          <div className="rounded-xl bg-white/20 p-6 backdrop-blur-xl space-y-2 w-full -mt-5">
            <p className="text-xl xl:text-2xl font-medium">
              {data.commonServices[1].title}
            </p>
            <p className="text-muted-foreground">
              {data.commonServices[1].description}
            </p>
          </div>
        </div>
        <div className="rounded-xl relative border shadow-md hover:shadow-xl duration-200 ease-out cursor-pointer overflow-hidden shrink-0">
          <div className="aspect-[4/3] relative">
            <Image
              src="https://ik.imagekit.io/z7onzn8tx/Realview_Media/business.jpg"
              alt="Google Business"
              fill
              className="object-cover"
            />
          </div>
          <div className="rounded-xl bg-white/20 p-6 backdrop-blur-md space-y-2 w-full -mt-5">
            <p className="text-xl xl:text-2xl font-medium">
              {data.commonServices[2].title}
            </p>
            <p className="text-muted-foreground">
              {data.commonServices[2].description}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-xl relative overflow-hidden shadow-md hover:shadow-xl border duration-200 ease-out">
        <iframe
          width="100%"
          height="500px"
          allowFullScreen
          src={data.estateService.linkDemo}
          className="relative cursor-pointer"
        />

        <div className="p-6 rounded-xl relative bg-white/20 backdrop-blur-xl w-full space-y-2 -mt-4">
          <p className="text-xl md:text-2xl font-medium">
            {data.estateService.title}
          </p>
          <p className="text-muted-foreground">
            {data.estateService.description}
          </p>
        </div>
      </div>
    </div>
  );
}
