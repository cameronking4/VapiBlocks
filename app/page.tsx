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
        <section className="w-full h-full max-w-3xl container px-4 pt-24">
          <div className="flex flex-col justify-center space-y-4 text-center">
            <div className="space-y-12">
              <span className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/50">
               Instantly add Voice AI into your Next.js apps
              </span>
              <p className="w-full mt-4 px-10 md:text-xl lg:text-lg xl:text-xl text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/50">
                Open source pre-built components & serverless functions to drop-in Voice AI into your web app - Shadcn & Vapi had a baby.
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
                  className="flex items-center gap-2 group"
                >
                  View Components <ArrowRightIcon/>
                </Button>
              </a>
            </div>
            <div className="w-full">
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
