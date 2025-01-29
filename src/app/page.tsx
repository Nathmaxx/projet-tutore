"use client";

import {
    Accordion,
    AccordionTrigger,
    AccordionContent,
    AccordionItem
} from "@/components/ui/accordion";
import {Card, CardContent, CardHeader} from "../components/ui/card";
import Image from "next/image";

import homeImage from "../img/Carte_Metropole_du_Grand_Lyon.png";
import Navbar from "@/components/Navbar";
import { AnimatedNoise } from "@/components/ui/AnimatedNoise";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
    return (
        <>
            <div className=' fixed h-screen w-full overflow-hidden -z-10'>
                <AnimatedNoise opacity={0.07}/>
            </div>
            <Navbar />
            <div className="flex flex-row gap-4 justify-center items-center h-full">
                <Card className="w-2/5 h-fit max-w-1/3">
                    <CardHeader className="w-full flex justify-center items-center">
                        <div className="text-2xl pb-1" >Bienvenue, sur DataWatt Lyon</div>
                    </CardHeader>
                    <CardContent className="w-full flex justify-center items-center">
                        <Image className="inline-block align-middle rounded-2xl" src={homeImage}
                               width={450} height={450} alt="PNG du Métropole de Lyon"

                        />
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
                                <AccordionTrigger>Combien de données sont à disposition?</AccordionTrigger>
                                <AccordionContent>
                                    Notre base de données contient 8100 lignes.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value={"item-3"}>
                                <AccordionTrigger>Quelles analyses sont à disposition?</AccordionTrigger>
                                <AccordionContent>
                                    On propose une analyse sous forme d&apos;une <Link href="">carte interactive</Link> puis
                                    une analyse sous forme de <Link href="">plusieurs graphiques</Link>.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value={"item-4"}>
                                <AccordionTrigger>Sur quelles années peuvent s'effectuer les analyses?</AccordionTrigger>
                                <AccordionContent>
                                    Les analyses peuvent se faire à partir de 2018 jusqu'à 2020.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </CardContent>
                </Card>
            </div>
            <Footer /> 
        </>
    );
}