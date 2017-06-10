---
layout: post
title: 初试VPS
banner: centos.jpeg
tags: vps linux centos
---

最近购买了[VPS](https://my.aoyouhost.com/page.aspx?c=referral&u=25748)，系统为64位CentOS 7，准备熟悉一下 linux 服务器的相关知识。以下是配置流水。

## 初始配置

* 首先连接至 vps：`ssh root@yourip`，vps 服务商会提供初始密码，第一时间修改密码：`passwd`
* 新建用户组 `groupadd [groupName]`
* 新建用户 `useradd -d /home/[username] -s /bin/bash -m [username]`
* 修改用户密码 `passwd [username]`
* 用户添加到组 `usermod -a -G [groupName] [username]`
* 为用户设置 sudo 权限：`sudo`，在 `root  ALL=(ALL)    ALL` 之后添加 `username ALL=(ALL)     ALL`
* 切换到 username 用户，是否能登录：`ssh username@yourip`

## SSH

为了安全和方便，配置 SSH 登录。

* 将本机的公钥拷贝到服务器的authorized_keys文件 `~/.ssh/id_rsa.pub | ssh darkzone@167.88.179.91 'mkdir -p .ssh && cat - >> ~/.ssh/authorized_keys'`，如果发现服务器 authorized_keys 文件内无内容，则直接粘贴进去。
* 编辑 ssh 配置文件： 
  ```bash
  sudo cp /etc/ssh/sshd_config ~ # 备份    
  sudo nano /etc/ssh/sshd_config
  ```

``` bash
Port 25000 #新端口

# 如下配置
# 禁止root用户登录，以及禁止用密码方式登录
Protocol 2

PermitRootLogin no
PermitEmptyPasswords no
PasswordAuthentication no

RSAAuthentication yes
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys

UseDNS no

AllowUsers bill # 添加
```

* 改变authorized_keys文件的权限：`sudo chmod 600 ~/.ssh/authorized_keys && chmod 700 ~/.ssh/`

*CentOS 7系统增加了 SELinux，修改端口后需要其他设置*

* 安装semanage：`yum -y install policycoreutils-python`
* 为 ssh 添加新的允许端口：`sudo semanage port -a -t ssh_port_t -p tcp 2222`
* `semanage port -l | grep ssh`，
  输出 `ssh_port_t                     tcp      2048, 22`
* 修改 /etc/selinux/config 配置：`SELINUX=permissive`，通过`sestatus`查看状态。
* 重启 ssh：`systemctl restart sshd `

## 防火墙配置

如上配置后ssh连接不上，需要配置防火墙

* 暴露新端口：`firewall-cmd --permanent --zone=public --add-port=25000/tcp`
* 重载防火墙：`firewall-cmd --reload`

至此，已经可以远程连接，如果为了方便，不必每次输入端口和 IP，可以在客户端 `~/.ssh` 目录下新建一个名为 `config` 文件：
```bash
Host my-server # name
HostName 0.0.0.0 #ip地址
User username
Port 25000
```
这样客户端执行 `ssh my-server`即可不用输入密码连接。


参考：
* [怎样修改 CentOS 7 SSH 端口](https://sebastianblade.com/how-to-modify-ssh-port-in-centos7/)
* [Linux服务器的初步配置流程](http://www.ruanyifeng.com/blog/2014/03/server_setup.html)
* [VPS新手指南/教程](https://www.vpser.net/vps-howto)
* [我的遨游云主机推广链接](https://my.aoyouhost.com/page.aspx?c=referral&u=25748)





