// 导航 元素 原子组件
var NavElem = React.createClass({

    render : function() {
        return (
            
            <li className='nav-list-one' >
                <a className='a-link' href='http://css.doyoe.com/'>
                    <div className='nav-elem-lable'>
                        <p>CSS参考手册学习</p>
                    </div>
                    <div className="nav-elem-ttile">
                        <p className='nav-elem-ttile-content'> View Handbook Study</p>
                    </div>
                </a>
            </li>
        )
    }
});


function A () {
    alert(111);
    return 1;
}

var NavList = React.createClass({
    getInitialState : function () {
        return {
            title : [CSS手册学习,前端实验室,My Bolg],
            lable : [css hookview, web front-end Lab, life circle in someday],
        };
    },

    render : function () {
        return (
            <ul>
                <NavElem />
            </ul>
        )
    }
});

var Navigation = React.createClass({
    getInitialState: function() {
        return {};
    },

    handleClick: function(event) {
        this.setState({liked: !this.state.liked});
    },

    render: function() {

        return (
            <div className='nav'>
                    <NavList />
            </div>
        );
    }
});

React.render(
    <Navigation />,
    document.getElementById('example')
);