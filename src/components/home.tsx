import {
	Accordion,
	AccordionTrigger,
	AccordionContent,
	AccordionItem
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader } from "./ui/card";
import BackgroundAnimation from "./BackgroundAnimation";

export default function Home() {
	return (
		<Card className="w-4/5 h-fit mx-auto">
			<CardHeader>
				<p className={"text-2xl"}>Bienvenue, sur " "</p>
			</CardHeader>
			<CardContent>
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
			</CardContent>
		</Card>
	);
}
