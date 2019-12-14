<template>
    <div class="table-data">
        <div class="search-box">
            <el-input 
                size="small"
                v-model="searchVal"
                placeholder="请输入检索关键字"
                />
            <el-button 
                size="small"
                type="primary">
                搜索
            </el-button>
        </div>
        <el-table 
            :data="tableData" 
            border 
            style="width: 100%;" 
            :height="tHeight" 
            class="'table-box"
            >
            <el-table-column type="index" label="序号" width="60"></el-table-column>
            <el-table-column label="课程名称" prop="name"></el-table-column>
            <el-table-column label="课程等级" width="100" prop="level"></el-table-column>
            <el-table-column label="课程类型" width="100" prop="type"></el-table-column>
            <el-table-column label="报名人数" width="120" prop="number"></el-table-column>
            <el-table-column label="开课时间" width="200" prop="date"></el-table-column>
            <el-table-column label="操作"  width="160">
                <template>
                    <el-button size="mini" type="warn">编辑</el-button>
                    <el-button size="mini" type="error">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pages" ref="page-box">
            <el-pagination 
                :page-sizes="[5, 10, 20]"
                :pase-size="page.pageSize"
                :total="page.total"
                layout="total,sizes,prev,pager,next,jumper"

                >

            </el-pagination>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue,  Provide } from 'vue-property-decorator'

// 装饰器模式
@Component({
    components:{} 
})

export default class TableData extends Vue{
    @Provide() searchVal: string = ''; // 搜索值
    @Provide() tableData: any = []; // 表格数据
    @Provide() tHeight: number = document.body.offsetHeight - 205; // 表格高度
    @Provide() page: {page:number, pageSize: number, total: number} = {
        page: 1, // 当前页
        pageSize: 15, // 分页大小
        total: 0 // 总条数
    }

    created() {
        this.loadData();
    }

    loadData() {
        (this as any)
            .$axios
            .post(`/api/courseList`, this.page)
            .then( (res: any) => {
                if(res.data.success) {
                    this.$message({
                        type: 'success',
                        message: "获取表格数据成功"
                    })
                    this.tableData = res.data.data;
                    this.page.total = res.data.total;
                } else {
                    this.$message({
                        type: 'error',
                        message: res.data.errorMsg
                    })
                }
            })
    }
}


</script>

<style lang="scss" scoped>
.search-box {
    display: flex;
    margin-bottom: 10px;
    .el-input--small {
        width: 250px;
        margin-right: 10px;
    }
}
</style>