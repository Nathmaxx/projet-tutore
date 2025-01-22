import {Accordion} from "@/components/ui/accordion";
import {AccordionItem} from "@/components/ui/accordion";
import {AccordionTrigger} from "@/components/ui/accordion";
import {AccordionContent} from "@/components/ui/accordion";

export default function Home() {
	return (
		<div>
			<p>
				<p class={"text-2xl"}>Bienvenue, sur " "</p>
				<Accordion type="single" collapsible>
					<AccordionItem value="item-1">
						<AccordionTrigger>Quelle est l'objectif?</AccordionTrigger>
						<AccordionContent>
							Permettre l'analyse facile de données en rapport avec
							la consommation d'électricité dans la métropole de Grand Lyon.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value={"item-2"}>
						<AccordionTrigger>Quelles analyses sont à disposition?</AccordionTrigger>
						<AccordionContent>
							On propose une analyse sous forme d'une carte interactive puis
							une analyse sous forme de graphique.
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</p>
		</div>
	);
}
