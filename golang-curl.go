/*
* Http (curl) request in golang
* @author Shashank Tiwari 
* Walter Lee added a loop to test Pcf auto-scaling to my 1st spring app on Pcf
*/
 
package main
 
import (
"fmt"
"net/http"
"io/ioutil"
)
 
func main() {
 
url := "http://cf-spring-lean-cheetah.cfapps.io/"

for i := 0; i < 100; i++ {
	
	req, _ := http.NewRequest("GET", url, nil)
 
	res, _ := http.DefaultClient.Do(req)
 
	defer res.Body.Close()

	body, _ := ioutil.ReadAll(res.Body)
	fmt.Println(string(body))

	fmt.Println("iteration no = ",i) 
	} 
}
