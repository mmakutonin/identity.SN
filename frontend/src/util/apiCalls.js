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
        .then(res => ({
            ...res.data.users.map(({email}) => ({
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
            messages:res.data.messages,
            createdAt:res.data.createdAt
        }))
    },
    sendMessage(message) {
        axios.post(`/api/v1/message`, {
            toId:       message.toId,
            fromId:     message.fromId,
            message:    message.message
        })
    }
}