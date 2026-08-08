import { ASCEND_STAGES } from "@/lib/ascend-system";
import { PACKAGES } from "@/lib/packages";
import { cn } from "@/lib/utils";
import { PeakIcon } from "@/components/brand/PeakIcon";

/**
 * Stage × package coverage. Presence is marked with the peak glyph,
 * absence with a hairline dash — no colour, no ticks.
 */
export function CoverageMatrix({
  surface = "light",
}: {
  surface?: "light" | "dark";
}) {
  const border = surface === "dark" ? "border-white/12" : "border-black/12";

  return (
    <div className="-mx-6 overflow-x-auto px-6 sm:mx-0 sm:px-0">
      <table className="w-full min-w-[36rem] border-collapse text-left">
        <caption className="sr-only">
          Ascend stages covered by each package
        </caption>
        <thead>
          <tr className={cn("border-b", border)}>
            <th scope="col" className="py-5 pr-6 type-label opacity-45">
              Stage
            </th>
            {PACKAGES.map((pkg) => (
              <th
                key={pkg.id}
                scope="col"
                className="py-5 px-4 text-center type-label"
              >
                <span className={cn(pkg.recommended ? "opacity-100" : "opacity-60")}>
                  {pkg.name}
                </span>
                <span className="mt-2 block type-meta text-[0.6rem] opacity-35">
                  {pkg.verb.replace(".", "")}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ASCEND_STAGES.map((stage) => (
            <tr key={stage.id} className={cn("border-b", border)}>
              <th scope="row" className="py-5 pr-6 font-normal">
                <span className="flex items-baseline gap-4">
                  <span className="type-meta text-[0.6rem] tabular-nums opacity-30">
                    {stage.index}
                  </span>
                  <span className="type-label">{stage.name}</span>
                </span>
              </th>
              {PACKAGES.map((pkg) => {
                const covered = pkg.stages.includes(stage.id);
                return (
                  <td key={pkg.id} className="px-4 py-5 text-center">
                    {covered ? (
                      <>
                        <PeakIcon
                          className="mx-auto h-3.5 w-3.5 opacity-85"
                          inner={false}
                        />
                        <span className="sr-only">Included</span>
                      </>
                    ) : (
                      <>
                        <span
                          aria-hidden="true"
                          className="mx-auto block h-px w-4 bg-current opacity-20"
                        />
                        <span className="sr-only">Not included</span>
                      </>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
