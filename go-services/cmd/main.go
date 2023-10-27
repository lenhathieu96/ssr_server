package main

import (
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/lenhathieu96/ssr_server/graph"
	config "github.com/lenhathieu96/ssr_server/utils"
)

func main() {
	config.LoadEnvFile()
	port := os.Getenv("PORT")

	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: &graph.Resolver{}}))

	// http.Handle("/", playground.Handler("GraphQL playground", "/query"))
	http.Handle("/", srv)

	log.Printf("Server started at http://localhost:%s", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
