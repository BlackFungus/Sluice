const express = require('express')
const app = new express()
const URL = require('url')
const server = require('http').createServer(app)
const iconv = require('iconv-lite');
const net = require('net');

app.listen('3000',function(){
    console.log("linsten 3000")
})

app.get('/open',function(req,res,next){
    const {order} = req.query
    console.log(order)
    let socket = net.createConnection(4001,'192.168.1.7',function(){
    socket.write(order)
    next()
    })
})

app.get('/open',function(req,res){
    res.send({"title":"asd"})
})

app.get("/getData",function(req,res,next){
    let socket = net.createConnection(4001,'192.168.1.7',function(){
        socket.write("GETSYSDATA")
        socket.on('data',function(data){
            res.socketData = iconv.decode(data,'gbk')
            next()
        })
    })
})

app.get("/getData",function(req,res,next){
    let msg = res.socketData.split(":")[1]
    let pressure1 = msg.slice(4,8)
    let pressure2 = msg.slice(8,12)
    let pressure3 = msg.slice(12,16)
    let pressure4 = msg.slice(16,20)
    let signal1 = msg.slice(4,6)
    let signal2 = msg.slice(6,8)
    let signal3 = msg.slice(8,10)
    let signal4 = msg.slice(10,12)
    let signal5 = msg.slice(12,14)
    let signal6 = msg.slice(14,16)
    let signal7 = msg.slice(16,18)
    let signal8 = msg.slice(18,20)
    console.log(msg)
    res.json({pressure1,pressure2,pressure3,pressure4,signal1,signal2,signal3,signal4,signal5,signal6,signal7,signal8})
})

