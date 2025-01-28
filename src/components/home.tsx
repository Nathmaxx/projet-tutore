import {
    Accordion,
    AccordionTrigger,
    AccordionContent,
    AccordionItem
} from "@/components/ui/accordion";
import {Card, CardContent, CardHeader} from "./ui/card";
import Image from "next/image";

import MyImage from "../img/Carte_Métropole_du_Grand_Lyon.png";

export default function Home() {
    return (
        <Card className="w-4/5 h-fit mx-auto">
            <CardHeader className="w-full flex justify-center items-center">
                <div className="text-2xl pb-3" >Bienvenue, sur DataWatt Lyon</div>
                <Image className="inline-block align-middle" src={MyImage} width={300} height={300} alt="My PNG Image"/>
            </CardHeader>
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
    );
}