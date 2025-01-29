import {
    Accordion,
    AccordionTrigger,
    AccordionContent,
    AccordionItem
} from "@/components/ui/accordion";
import {Card, CardContent, CardHeader} from "./ui/card";
import Image from "next/image";

import MyImage from "../img/Carte_Metropole_du_Grand_Lyon.png";

export default function Home() {
    return (
        <div className="flex flex-row gap-4 justify-center items-center h-full">
            <Card className="w-2/5 h-fit max-w-1/3">
                <CardHeader className="w-full flex justify-center items-center">
                    <div className="text-2xl pb-1" >Bienvenue, sur DataWatt Lyon</div>
                </CardHeader>
                <CardContent className="w-full flex justify-center items-center">
                    <Image className="inline-block align-middle" src={MyImage} width={450} height={450} alt="My PNG Image"/>
                </CardContent>
            </Card>
            <Card className="w-2/5 h-fit max-w-1/3">
                <CardContent>
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Quel est l&apos;objectif?</AccordionTrigger>
                            <AccordionContent>
                                Permettre l&apos;analyse facile de données en rapport avec
                                la consommation d&apos;électricité et gaz dans la métropole de Grand Lyon.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value={"item-2"}>
                            <AccordionTrigger>Quelles analyses sont à disposition?</AccordionTrigger>
                            <AccordionContent>
                                On propose une analyse sous forme d&apos;une carte interactive puis
                                une analyse sous forme de plusieurs graphique.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>
        </div>
    );
}