const apiUrl = process.env.API_URL

export async function GET(request: Request) {

  try {

    console.log("apiUrl", apiUrl)

    const response = await fetch(`${apiUrl}consommations/stat/conso-surface`, );
 
    const data = await response.json()
    
    return Response.json(data);

  } catch (error) {
    if (error instanceof Error) {
      return new Response(`Erreur: ${error.message}`, {
        status: 500,
      });
    } else {
      return new Response('Erreur inconnue', {
        status: 500,
      });
    }
  }
}