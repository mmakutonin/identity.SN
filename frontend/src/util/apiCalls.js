import axios from 'axios'
const transformUserId = id => id.replace(/\./g,'%2e')
export default {
    getIdentitiesAll(n=20, skip=0, root=null, query='') {
        return axios.get('api/v1/identity', {
            params: {
                n,
                skip,
                ...(root && {root}),
                ...(query && {query})
            }
        }).then(res => res.data.reduce((agg,{identity}) => {
            agg[identity] = identity
            return agg
        }, {}))
    },
    getUser(id, includeInterestsAndIdentities) {
        const querystring = `/api/v1/user/${transformUserId(id)}${includeInterestsAndIdentities ? '?interests=true&identities=true' : ''}`
        console.log(querystring)
        return axios.get(querystring)
        .then(res => res.data)
        .then(data => {
            console.log(data)
            if(includeInterestsAndIdentities) {
                return {
                    interestsKnown: data.interests.reduce((agg,{id}) => ({...agg, id:id}), {}),
                    identitiesKnown: data.identities.reduce((agg,{id}) => ({...agg, id:id}), {})
                }
            }
            else {
                return data.displayName
            }
        })
    },
    addUserItem(item, idOrInterest, userId) {
        return axios.post(`api/v1/user/${transformUserId(userId)}/${idOrInterest}`, {identity: item})
    },
    rmUserItem(item, idOrInterest, userId) {
        return axios.delete(`api/v1/user/${transformUserId(userId)}/${idOrInterest}`, {identity:item})
    },
    findMatch(userId) {
        return axios.get(`/api/v1/user/${transformUserId(userId)}/match`)
    },
    getRoomMessages(roomId, userId) {
        return axios.get(`api/v1/room/${roomId}`)
        .then(res => res.data.messages.map(message => ({
            sender:     message.from === userId ? true : false,
            toId:       message.to,
            fromId:     message.from,
            message:    message.message,
            timestamp:  message.createdAt,
            tone:       message.tone
        })))
    },
    async getRooms(userId) {
        let res = await axios.get(`/api/v1/user/${transformUserId(userId)}/room`)
        res = await res.data.map(async res => ({
            ...res.users.map(({email}) => ({
                id: email,
                initials: email.substring(0,2).toUpperCase()
            })).reduce((agg, user) => {
                if(user.id !== userId) {
                    return user
                }
                else {
                    return agg
                }
            }),
            messages: await this.getRoomMessages(res.id, userId),
            roomId: res.id,
            createdAt:res.createdAt
        }))
        return Promise.all(res)
    },
    sendMessage(message) {
        axios.post(`/api/v1/message`, {
            toId:       message.toId,
            fromId:     message.fromId,
            message:    message.message
        }).then(res => res.data)
    }
}