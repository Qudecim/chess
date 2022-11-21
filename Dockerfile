FROM golang:1.17-alpine as builder
RUN apk --no-cache add ca-certificates git
WORKDIR /build

# Fetch dependencies
COPY go.mod go.sum ./
RUN go mod download

# Build
# 
COPY . ./
WORKDIR /build/cmd/app
RUN CGO_ENABLED=0 go build -o myapp


# Create final image
FROM alpine
WORKDIR /
COPY --from=builder /build/cmd/app/myapp .
EXPOSE 3001
CMD ["./myapp"]