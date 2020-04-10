res = []
        def helper(lst,tmp):
            if len(lst) == 0 and len(tmp) == 4:
                res.append(".".join(tmp))
                return
            if tmp and len(tmp) > 4:
                return
            for i in range(len(lst)):
                helper(lst[i+1:], tmp+[lst[i]])
                if tmp and tmp[-1] != '0' and int(tmp[-1] + lst[i]) < 256:
                    tmp[-1] = tmp[-1] + lst[i]
                    helper(lst[i+1:], tmp)
                return
        helper(s, [])
        return res
