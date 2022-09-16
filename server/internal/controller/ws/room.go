package v1

type Room struct {

	name string

	clients chan *Client

}