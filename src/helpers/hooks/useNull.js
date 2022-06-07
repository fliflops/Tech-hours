const useNull = () => {

    const hasNull = (data) => {
        let nulls = []
        for(let item in data){
            if(data[item] == null || data[item] === ''){
                nulls.push(item)
            }
        }

        return nulls
    }

    return [hasNull]
}

export default useNull