import {Combobox} from "@/components/ComboBox";
import {Card, CardHeader} from "@/components/ui/card";

export default function Carte() {
    return (
        <Card className="w-4/5 h-fit mx-auto">
            <CardHeader>
                <h1 className="text-2xl font-bold">Carte page</h1>
            </CardHeader>
            <div className="flex items-center space-x-4 text-sm m-10">
                <div>Début: <Combobox /></div>
                <div>Fin: <Combobox /></div>
            </div>
        </Card>
    );
}