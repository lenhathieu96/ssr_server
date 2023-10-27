//go:run prod

package config

import (
	"fmt"
	"log"
	"reflect"

	"github.com/joho/godotenv"
)

type Environment struct {
	env string `"other:value"`
}

func LoadEnvFile() {
	tag := reflect.TypeOf(Environment{})
	f1, _ := tag.FieldByName("env")
	fmt.Println(f1.Tag.Get("other"))

	path := "environment/.env.dev"
	log.Printf("Load env file at path: %s", path)
	godotenv.Load(path)
}
