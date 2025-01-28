import { Card, CardHeader } from "./ui/card";

export default function Navbar() {
    return (
        <div className="">
            <Card className="w-4/5 h-fit mx-auto">
                <CardHeader>
                    <h1 className="text-2xl font-bold">Contact page</h1>
                </CardHeader>
            </Card>
            <Card className="w-4/5 mx-auto mt-5 p-8">
                <p className="font-bold text-xl mb-4">Emails:</p>
                    <ul className="pl-10">
                        <li>Idrissa SALL : idrissa.sall@etu.univ-lyon1.fr</li>
                        <li>Soren STARCK : soren.starck@etu.univ-lyon1.fr</li>
                        <li>Baptiste DO CABO : baptiste.do-cabo@etu.univ-lyon1.fr</li>
                        <li>Juliett ROJAS : juliett.rojas@etu.univ-lyon1.fr</li>
                        <li>Nathan GIRARDI : nathan.girardi@etu.univ-lyon1.fr</li>
                    </ul>
            </Card>
        </div>

    );
}