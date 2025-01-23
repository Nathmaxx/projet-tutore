import { Card, CardHeader } from "./ui/card";
import {ComboBoxYear} from "@/components/ComboBoxYear";
import {ComboBoxGraphType} from "@/components/ComboBoxGraphType";
import {BarCharter} from "@/components/BarCharter";

export default function Graph() {
    return (
        <Card className="w-4/5 h-fit mx-auto">
            <CardHeader>
                <h1 className="text-2xl font-bold">Graph page</h1>
            </CardHeader>

            <div className= "m-3">Graph type: <ComboBoxGraphType /></div>

            <div className="m-2"><BarCharter /></div>

            <div className="flex items-center space-x-4 text-sm m-10">
                <div>Début: <ComboBoxYear /></div>
                <div>Fin: <ComboBoxYear /></div>
            </div>
        </Card>
    );
}