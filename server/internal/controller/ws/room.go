package v1

type Room struct {

	name []byte

	clients chan *Client

}
