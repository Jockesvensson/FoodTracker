<template>
    <footer>
        <div id="footer" class="container-fluid">
            <div  class="container">
        <p>{{footerText}}</p>
        </div>
        </div>
        </footer>
</template>

<script>

export default {
    data() {
        return {
            footerText: 'Joakim Svensson © 2020'
        }
    },
    
    
}
</script>

<style lang="scss" scoped>
footer {
    color: white;
    background-color: rgb(35, 218, 172);
    margin-top: 0px;
    bottom: 0;
    width: 100%;
    padding: 10px;
    position: relative;
    text-align: center;

}

</style>