<template>
  <div>
    <p>{{curScrollPos}}</p>
    <div class="wrapper" ref="scrollWrapper">
      <ul class="content">
        <li>列表项1</li>
        <li>列表项2</li>
        <li>列表项3</li>
        <li>列表项4</li>
        <li>列表项5</li>
        <li>列表项6</li>
        <li>列表项7</li>
        <li>列表项8</li>
        <li>列表项9</li>
        <li>列表项10</li>
        <li>列表项11</li>
        <li>列表项12</li>
        <li>列表项13</li>
        <li>列表项14</li>
        <li>列表项15</li>
        <li>列表项16</li>
        <li>列表项17</li>
        <li>列表项18</li>
        <li>列表项19</li>
        <li>列表项20</li>
        <li>列表项21</li>
        <li>列表项22</li>
        <li>列表项23</li>
        <li>列表项24</li>
        <li>列表项25</li>
        <li>列表项26</li>
        <li>列表项27</li>
        <li>列表项28</li>
        <li>列表项29</li>
        <li>列表项30</li>
        <li>列表项31</li>
        <li>列表项32</li>
        <li>列表项33</li>
        <li>列表项34</li>
        <li>列表项35</li>
        <li>列表项36</li>
        <li>列表项37</li>
        <li>列表项38</li>
        <li>列表项39</li>
        <li>列表项40</li>
        <li>列表项41</li>
        <li>列表项42</li>
        <li>列表项43</li>
        <li>列表项44</li>
        <li>列表项45</li>
        <li>列表项46</li>
        <li>列表项47</li>
        <li>列表项48</li>
        <li>列表项49</li>
        <li>列表项50</li>
        <li>列表项51</li>
        <li>列表项52</li>
        <li>列表项53</li>
        <li>列表项54</li>
        <li>列表项55</li>
        <li>列表项56</li>
        <li>列表项57</li>
        <li>列表项58</li>
        <li>列表项59</li>
        <li>列表项60</li>
        <li>列表项61</li>
        <li>列表项62</li>
        <li>列表项63</li>
        <li>列表项64</li>
        <li>列表项65</li>
        <li>列表项66</li>
        <li>列表项67</li>
        <li>列表项68</li>
        <li>列表项69</li>
        <li>列表项70</li>
        <li>列表项71</li>
        <li>列表项72</li>
        <li>列表项73</li>
        <li>列表项74</li>
        <li>列表项75</li>
        <li>列表项76</li>
        <li>列表项77</li>
        <li>列表项78</li>
        <li>列表项79</li>
        <li>列表项80</li>
        <li>列表项81</li>
        <li>列表项82</li>
        <li>列表项83</li>
        <li>列表项84</li>
        <li>列表项85</li>
        <li>列表项86</li>
        <li>列表项87</li>
        <li>列表项88</li>
        <li>列表项89</li>
        <li>列表项90</li>
        <li>列表项91</li>
        <li>列表项92</li>
        <li>列表项93</li>
        <li>列表项94</li>
        <li>列表项95</li>
        <li>列表项96</li>
        <li>列表项97</li>
        <li>列表项98</li>
        <li>列表项99</li>
        <li>列表项100</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';

  export default {
    name: "Category",
    data() {
      return {
        scroll: null,
        curScrollPos: {}
      }
    },
    mounted() {  // *** 注意一定不可在created()钩子函数中获取本组件中的元素 ***
      // probe:侦测
      // probeType:0或1=>不侦测
      // probeType:2=>在手指滚动的过程中侦测，手指离开后的惯性滚动过程中不侦测
      // probeType:3=>只要是滚动，都进行侦测
      this.scroll = new BScroll(document.querySelector('.wrapper'), {
        probeType: 3,
        pullUpLoad: true
      });
      this.scroll.on('scroll', position => {
        this.curScrollPos = position;
      });
      this.scroll.on('pullingUp', () => {
        console.log('上拉加载更多');
        setTimeout(() => {
          this.scroll.finishPullUp()
        }, 2000);
      });
    }
  }
</script>

<style scoped>
  .wrapper {
    height: 200px;
    background-color: pink;
    overflow: hidden;
  }
</style>
