/*
 * ------------------------------------------
 * 日志列表模块实现文件
 * @version  1.0
 * @author   genify(caijf@corp.netease.com)
 * ------------------------------------------
 */
NEJ.define([
    'base/klass',
    'base/element',
    'util/dispatcher/module',
    'util/list/page',
    'util/template/tpl',
    'pro/module/module',
    'pro/cache/blog'
],function(_k,_e,_t,_t0,_t1,_m,_d,_p,_o,_f,_r){
    var _pro;
    /**
     * 日志列表模块对象
     * 
     * @class   {_$$ModuleBlogList}
     * @extends {_$$Module}
     * 
     * @param   {Object}  可选配置参数，已处理参数列表如下所示
     * 
     */
    _p._$$ModuleBlogList = _k._$klass();
    _pro = _p._$$ModuleBlogList._$extend(_m._$$Module);
    /**
     * 构建模块
     * @return {Void}
     */
    _pro.__doBuild = function(){
        this.__super();
        this.__body = _e._$html2node(
            _t1._$getTextTemplate('module-id-2')
        );
        // 0 - list box
        // 1 - pager box
        var _list = _e._$getByClassName(this.__body,'js-flag');
        this.__mopt = {
            limit:15,
            parent:_list[0],
            item:'jst-2-blog-list',
            cache:{klass:_d._$$CacheBlog},
            pager:{clazz:'w-pager',parent:_list[1]},
            onbeforelistload:this.__onLoadingShow._$bind(this),
            onemptylist:this.__onMessageShow._$bind(this,'没有日志列表！')
        };
    };
    /**
     * 刷新模块
     * @param  {Object} 配置信息
     * @return {Void}
     */
    _pro.__onRefresh = (function(){
        var _doParseCKey = function(_param){
            if (!!_param.cid)
                return 'class-'+_param.cid;
            if (!!_param.tid)
                return 'tag-'+_param.tid;
            return 'box-'+(_param.box||1);
        };
        return function(_options){
            this.__super(_options);
            debugger;
            if (this.__lmdl) this.__lmdl._$recycle();
            this.__mopt.cache.lkey = _doParseCKey(_options.param||_o);
            this.__lmdl = _t0._$$ListModulePG._$allocate(this.__mopt);
        };
    })();
    /**
     * 订阅推送消息
     * @param {Object} _event
     */
    _pro.__onSubscribe = function(_event){
        console.log('hi,i\'m '+this.__umi+', subscribe message from '+_event.from+' and say: '+JSON.stringify(_event.data));
    };
    // notify dispatcher
    _t._$regist('blog-list',_p._$$ModuleBlogList);
});
