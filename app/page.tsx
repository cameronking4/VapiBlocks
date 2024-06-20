import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Shine } from "@/components/examples/shine";
import Orb from "@/components/examples/3d-orb";
import Logos from "@/components/logos";
import { ArrowRightIcon } from "lucide-react";

export default async function Home() {
  const getRepoStarts = async () => {
    const res = await fetch(
      "https://api.github.com/repos/cameronking4/VapiBlocks",
      {
        cache: "no-store",
      }
    );
    const data = await res.json();
    return data.stargazers_count;
  };
  const stars = await getRepoStarts();
  return (
    <div className="flex flex-col gap-4 container justify-center items-center">
      <Shine>
        <section className="w-full h-full max-w-7xl container px-4 pt-24">
          <div className="flex flex-col justify-center space-y-4 text-center">
            <div className="space-y-12">
              <span className="text-7xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/50">
              Effortlessly add Voice AI into your Apps with pre-built UI Components
              </span>
              <p className="w-full mt-4 px-10 md:text-xl lg:text-lg xl:text-xl text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/50">
              Beautiful components and serverless functions to drop into your web apps. <br/> Click orb below to get started.
              </p>
            </div>
            <div className="flex justify-center">
              <a
                href="/docs/changelog"
                className="no-underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="flex items-center group gap-2"
                >
                  View Components <ArrowRightIcon size={12}/>
                </Button>
              </a>
            </div>
            <div>
              <Orb />
            </div>
          </div>
        </section>
      </Shine>
      <Logos />
      <div className="flex justify-center mb-8">
              <a
                href="https://github.com/cameronking4/VapiBlocks"
                className="no-underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="flex items-center gap-2 group"
                >
                  <span className="group-hover:text-yellow-400 transition-all duration-300 ease-in-out">
                    {stars}
                  </span>
                  {stars === 1 ? "star" : "stars"} on GitHub <Icons.github />
                </Button>
              </a>
            </div>
            <hr/>
    </div>
  );
}
